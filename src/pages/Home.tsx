import { useState } from "react";
import CastleCardSmall from "../components/CastleCardSmall";
import FilterDropdown from "../components/FilterDropdown";
import { useNavigate, useSearchParams } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddGuestsCounter from "@/components/AddGuestsCounter";
import { useCastleListing } from "@/contexts/CastleListingContext";
import useSelectOptions from "@/hooks/useFilter";
import DateCalendar from "@/components/DateCalendar";
import { format } from "date-fns";

const Home = () => {
  const { listings, selectedGuests, selectedDates, filters, actions } =
    useCastleListing();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);

  const [locationInput, setLocationInput] = useState<string>("");

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

    setIsGuestsModalOpen(false);
    setIsFilterModalOpen(false);
  };

  const guestsModalHandler = () => {
    setIsGuestsModalOpen((isGuestsModalOpen) => !isGuestsModalOpen);

    setIsDateModalOpen(false);
    setIsFilterModalOpen(false);
  };

  const filterModalHandler = () => {
    setIsFilterModalOpen((isFilterModalOpen) => !isFilterModalOpen);

    setIsDateModalOpen(false);
    setIsGuestsModalOpen(false);
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
      // filter.selectedOptions.length > 0 &&
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
      {/* Photo by Rasmus Andersen: https://www.pexels.com/photo/red-brick-castle-in-landskrona-sweden-31599512/ */}
      <div className="flex w-full h-100 bg-[url(https://images.pexels.com/photos/31599512/pexels-photo-31599512.jpeg)] bg-cover bg-center rounded-b-lg">
        {/* Search castles */}
        <div className="flex flex-col bg-white/70 m-auto pt-12 pb-7 px-8 rounded-sm gap-1.5 items-center">
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              className="bg-white bg-[url(assets/Filter_Alt.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm"
              placeholder="Search location"
              onChange={handleChange}
              value={locationInput}
            />
            <input
              type="text"
              className="bg-white bg-[url(assets/Calendar_Month.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm"
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
            <input
              type="text"
              className="bg-white bg-[url(assets/Groups.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm"
              placeholder="Select guests"
              onClick={guestsModalHandler}
            />
            <input
              type="text"
              className="bg-white bg-[url(assets/Filter_Alt.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm"
              placeholder="Filter"
              onClick={filterModalHandler}
            />
          </div>
          <div className="mt-15">
            <button className="btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
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
          <button onClick={filterModalHandler}>Apply</button>
        </div>
      )}

      {isGuestsModalOpen && (
        <div>
          <p onClick={guestsModalHandler}>X</p>
          <AddGuestsCounter />
        </div>
      )}

      <div className="text-center w-80 mx-auto my-5">
        <h1>Check Into a Fairytale</h1>
        <p>
          Sleep in real castles, wake to real magic. Or why not join us for
          ghost hunting? With Nobal Stay, your storybook stay begins for real.
        </p>
      </div>

      <div className="ml-1">
        {/* Scandinavia castles carousel */}
        <h2 className="ml-2">Scandinavia</h2>
        <div>
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="-ml-1">
              {listings.map((c) => (
                <CarouselItem className="basis-auto">
                  <CastleCardSmall castle={c} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Sweden castles carousel */}
        <h2 className="ml-2">Sweden</h2>
        <div className="">
          <Carousel>
            <CarouselContent className="-ml-1">
              {listings.map((c) => (
                <CarouselItem className="basis-auto">
                  <CastleCardSmall castle={c} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default Home;
