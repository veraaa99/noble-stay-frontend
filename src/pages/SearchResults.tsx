import { useNavigate, useSearchParams } from "react-router";
import CastleCardBig from "../components/CastleCardBig";
import { useEffect, useState } from "react";
import FilterDropdown from "../components/FilterDropdown";
import { useCastleListing } from "@/contexts/CastleListingContext";
import useSelectOptions from "@/hooks/useFilter";
import DateCalendar from "@/components/DateCalendar";

import locationIcon from "../assets/Location_On.svg";
import calendarIcon from "../assets/Calendar_Month.svg";
import axios from "@/axios_api/axios";
import { format } from "date-fns";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const {
    listings,
    selectedGuests,
    selectedDates,
    filters,
    filterCheckboxes,
    actions,
  } = useCastleListing();

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [locationInput, setLocationInput] = useState(
    searchParams.get("location")?.toString()
  );

  const [filteredListings, setFilteredListings] =
    useState<CastleListing[]>(listings);

  useEffect(() => {
    const getListingsByFilter = async () => {
      if (searchParams.toString() == "") {
        setFilteredListings(listings);
        return;
      }

      try {
        let res = await axios.get(`/api/listings/search?${searchParams}`);
        if (res.status !== 200) return;

        setFilteredListings(res.data);
        return;
      } catch (error: any) {
        console.log(error.message);
        return;
      }
    };
    if (!searchParams.toString()) {
      setFilteredListings(listings);
    } else {
      getListingsByFilter();
    }
  }, [searchParams]);

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(
      filterName,
      filterOption,
      filters
    );
    actions.setSelectedFilters(updateSelectedFilters);
  };

  const dateModalHandler = () => {
    setIsDateModalOpen((isDateModalOpen) => !isDateModalOpen);
    setIsFilterModalOpen(false);
  };

  const filterModalHandler = () => {
    setIsFilterModalOpen((isFilterModalOpen) => !isFilterModalOpen);
  };

  const handleSearch = () => {
    setIsFilterModalOpen((isFilterModalOpen) => !isFilterModalOpen);

    // Location params
    if (locationInput !== undefined) {
      searchParams.set("location", locationInput);
    }

    // Dates params
    if (selectedDates && selectedDates.from && selectedDates.to) {
      searchParams.set("from", format(selectedDates.from, "yyyy-MM-dd"));
      searchParams.set("to", format(selectedDates.to, "yyyy-MM-dd"));
    }

    // Guests params
    selectedGuests.map((guest) => {
      guest.number > 0 &&
        searchParams.set(guest.category, guest.number.toString());
    });

    // Filter params
    filters.map((filter) => {
      if (filter.selectedOptions.length == 0 && searchParams.has(filter.name)) {
        searchParams.delete(filter.name);
      }

      // filter.selectedOptions.length > 0 &&
      filter.selectedOptions.map((option) => {
        if (searchParams.has(filter.name, option)) {
          if (filterCheckboxes.find((o) => o == option) == undefined) {
            searchParams.delete(filter.name, option);
          } else if (filterCheckboxes.find((o) => o == option)) {
            searchParams.set(filter.name, option);
          }
        } else {
          searchParams.append(filter.name, option);
        }
      });
    });

    // getListingsByFilter();
    window.location.search = searchParams.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
  };

  return (
    <div>
      {/* Search filters */}
      <div className="flex flex-col px-4 mt-5 mb-5 gap-8">
        <div className="flex flex-col gap-5">
          <h1>Showing results for:</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <img src={locationIcon} alt="" />
              <input
                type="text"
                placeholder={
                  searchParams.get("location") == null
                    ? "Select location"
                    : searchParams.get("location")?.toString()
                }
                onChange={handleChange}
                value={locationInput}
              />
            </div>
            <div className="flex gap-1">
              <img src={calendarIcon} alt="" />
              <input
                type="text"
                placeholder={
                  selectedDates == undefined
                    ? "Select date"
                    : `${selectedDates.from?.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })} - ${selectedDates.to?.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                }
                onClick={dateModalHandler}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p>
            <strong>{filteredListings.length}</strong> found
          </p>
          <button className="btn-secondary" onClick={filterModalHandler}>
            Filter
          </button>
        </div>
      </div>

      {isDateModalOpen && (
        <div>
          <p onClick={dateModalHandler}>X</p>
          <DateCalendar />
        </div>
      )}

      {isFilterModalOpen && (
        <div>
          <p onClick={filterModalHandler}>X</p>
          {filters.map((filter) => (
            <FilterDropdown
              name={filter.name}
              options={filter.options}
              onHandleSelectOptions={handleSelectOptions}
            />
          ))}
          <button onClick={handleSearch}>Apply</button>
        </div>
      )}

      {/* Search results */}
      {filteredListings !== undefined && (
        <div>
          {filteredListings.map((listing) => (
            <CastleCardBig castle={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;
