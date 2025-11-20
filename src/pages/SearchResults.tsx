import { useSearchParams } from "react-router";
import CastleCardBig from "../components/CastleCardBig";
import { useEffect, useState } from "react";
import FilterDropdown from "../components/FilterDropdown";
import { useCastleListing } from "@/contexts/CastleListingContext";
import useSelectOptions from "@/hooks/useFilter";

import locationIcon from "../assets/Location_On.svg";
import calendarIcon from "../assets/Calendar_Month.svg";
import axios from "@/axios_api/axios";
import { format } from "date-fns";
import Modal from "react-modal";
import DateCalendar from "@/components/DateCalendar";

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

  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const [locationInput, setLocationInput] = useState<string | undefined>(
    searchParams.get("location")?.toString()
  );

  const [filteredListings, setFilteredListings] =
    useState<CastleListing[]>(listings);

  useEffect(() => {
    const getListingsByFilter = async () => {
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
    if (searchParams.size == 0) {
      setFilteredListings(listings);
    } else {
      getListingsByFilter();
    }
  }, []);

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

    window.location.search = searchParams.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
  };

  return (
    <div>
      {/* Search filters */}
      <div className="flex flex-col px-4 mt-5 mb-5 gap-8 sm:gap-5 sm:mx-5">
        <div className="flex flex-col gap-5 sm:gap-2">
          <h1>Showing results for:</h1>
          <div className="flex flex-col gap-1 sm:flex-row">
            <div className="flex gap-1">
              <img src={locationIcon} alt="" />
              <input
                type="text"
                className="sm:w-25"
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
                className="sm:w-25"
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

          <Modal
            isOpen={isDateModalOpen}
            onRequestClose={dateModalHandler}
            className="w-90 bg-white pb-5 px-5 rounded shadow-lg max-w-md mx-auto realtive"
            overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
          >
            <div className="flex flex-col items-center justify-center">
              <DateCalendar />
              <p
                className="link underline cursor-pointer"
                onClick={dateModalHandler}
              >
                Select dates
              </p>
            </div>
          </Modal>

          {selectedGuests.map(
            (guest) =>
              guest.number > 0 && (
                <div className="flex flex-row gap-1">
                  <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                    {guest.category}:{" "}
                  </p>
                  <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                    {guest.number}
                  </p>
                </div>
              )
          )}

          {filters.map(
            (filter) =>
              filter.selectedOptions.length > 0 && (
                <div className="flex flex-row gap-1">
                  <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                    {filter.name}:
                  </p>
                  {filter.selectedOptions.map((option) => (
                    <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                      {option}
                    </p>
                  ))}
                </div>
              )
          )}
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

      <Modal
        isOpen={isFilterModalOpen}
        onRequestClose={filterModalHandler}
        className="w-70 bg-white py-5 px-5 mt-10 rounded shadow-lg max-w-md mx-auto realtive"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <div className="flex flex-col justify-center gap-3">
          <h2
            className="cursor-pointer text-(--color-foreground) font-light text-right"
            onClick={filterModalHandler}
          >
            ✕
          </h2>
          {filters.map((filter) => (
            <FilterDropdown
              name={filter.name}
              options={filter.options}
              onHandleSelectOptions={handleSelectOptions}
            />
          ))}
          <button className="btn-secondary self-center" onClick={handleSearch}>
            Search
          </button>
        </div>
      </Modal>

      {/* Search results */}
      {filteredListings !== undefined && (
        <div className="sm:flex sm:flex-wrap sm:items-start sm:px-5 sm:gap-10">
          {filteredListings.map((listing) => (
            <CastleCardBig key={listing._id} castle={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;
