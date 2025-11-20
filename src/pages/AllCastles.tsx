import { useEffect, useState } from "react";
import CastleCardBig from "../components/CastleCardBig";
import FilterDropdown from "../components/FilterDropdown";
import useSelectOptions from "@/hooks/useFilter";
import { useNavigate, useSearchParams } from "react-router";
import { useCastleListing } from "@/contexts/CastleListingContext";
import DateCalendar from "@/components/DateCalendar";

import locationIcon from "../assets/Location_On.svg";
import calendarIcon from "../assets/Calendar_Month.svg";
import { format } from "date-fns";
import Modal from "react-modal";

const AllCastles = () => {
  const { listings, selectedGuests, selectedDates, filters, actions } =
    useCastleListing();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [locationInput, setLocationInput] = useState<string>("");

  useEffect(() => {
    actions.resetFilters();
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
    // Location params
    if (locationInput.trim() !== "") {
      searchParams.append("location", locationInput);
    }

    // Dates params
    if (selectedDates && selectedDates.from && selectedDates.to) {
      searchParams.append("from", format(selectedDates.from, "yyyy-MM-dd"));
      searchParams.append("to", format(selectedDates.to, "yyyy-MM-dd"));
    }

    // Guests params
    selectedGuests.map((guest) => {
      guest.number > 0 &&
        searchParams.append(guest.category, guest.number.toString());
    });

    // Filter params
    filters.map((filter) => {
      filter.selectedOptions.forEach((option) =>
        searchParams.append(filter.name, option)
      );
    });

    // Insert searchparams and navigate to /search/
    if (searchParams.toString() == "") {
      navigate(`/search/`);
    } else {
      navigate(`/search/?${searchParams}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationInput(value);
  };

  return (
    <div>
      <div className="flex flex-col px-4 mt-5 mb-5 gap-8 sm:gap-5 sm:mx-5">
        <div className="flex flex-col gap-5 sm:gap-2">
          <h1>All castles</h1>
          <div className="flex flex-col gap-1 sm:flex-row">
            <div className="flex gap-1">
              <img src={locationIcon} alt="" />
              <input
                type="text"
                className="sm:w-25"
                placeholder="All Locations"
                onChange={handleChange}
                value={locationInput}
              />
            </div>
            <div className="flex gap-1">
              <img src={calendarIcon} alt="" />
              <input
                type="text"
                className="sm:w-35"
                placeholder={
                  selectedDates == undefined
                    ? "No date specified"
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
            <strong>{listings.length}</strong> found
          </p>
          <button className="btn-secondary" onClick={filterModalHandler}>
            Filter
          </button>
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

      {/* Castle card/s */}
      <div className="sm:flex sm:flex-wrap sm:items-start sm:px-5 sm:gap-10">
        {listings.map((c) => (
          <CastleCardBig castle={c} />
        ))}
      </div>
    </div>
  );
};
export default AllCastles;
