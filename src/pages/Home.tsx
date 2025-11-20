import { useEffect, useState } from "react";
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
import Modal from "react-modal";

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

  useEffect(() => {
    actions.resetFilters();
  }, []);

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
      <div className="flex w-full h-100 bg-[url(https://images.pexels.com/photos/31599512/pexels-photo-31599512.jpeg)] bg-cover bg-center rounded-b-lg sm:rounded-none sm:flex-col sm:h-full">
        {/* Welcome (desktop) */}
        <div className="hidden sm:flex text-center flex-col bg-white/80 m-auto sm:w-100 sm:mt-10 sm:px-10 sm:mb-10 sm:pt-5 sm:pb-8 md:mb-20 md:pt-12 md:pb-20 lg:w-xl rounded-sm gap-1.5 items-center">
          <h1>Check Into a Fairytale</h1>
          <h4 className=" text-(--very-dark-brown) text-center">
            Sleep in real castles, wake to real magic. Or why not join us for
            ghost hunting? With Nobal Stay, your storybook stay begins for real.
          </h4>
        </div>
        {/* Search castles */}
        <div className="flex flex-col bg-white/70 m-auto pt-12 pb-7 px-8 rounded-sm gap-1.5 items-center sm:py-3 sm:flex-row sm:px-2 sm:mb-10 md:pt-5 md:pb-5 sm:rounded-full sm:items-center md:gap-5 lg:py-2">
          <div className="flex flex-col gap-1.5 sm:flex-row">
            <input
              type="text"
              className="bg-white bg-[url(assets/Filter_Alt.svg)] bg-no-repeat bg-position-[10px] pl-8 py-1 border-1 border-(--sidebar-border) rounded-sm sm:text-[10px] sm:w-30"
              placeholder="Search location"
              onChange={handleChange}
              value={locationInput}
            />
            <input
              type="text"
              className="bg-white bg-[url(assets/Calendar_Month.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm sm:text-[10px] sm:w-30"
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
              className="bg-white bg-[url(assets/Groups.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm sm:text-[10px] sm:w-30"
              placeholder="Select guests"
              onClick={guestsModalHandler}
            />
            <input
              type="text"
              className="bg-white bg-[url(assets/Filter_Alt.svg)] bg-no-repeat bg-position-[10px] pl-10 py-1 border-1 border-(--sidebar-border) rounded-sm sm:text-[10px] sm:w-30"
              placeholder="Filter"
              onClick={filterModalHandler}
            />
          </div>
          <div className="mt-15 sm:mt-0">
            <button className="btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
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
        isOpen={isGuestsModalOpen}
        onRequestClose={guestsModalHandler}
        className="w-80 bg-white py-5 px-5 mt-10 rounded shadow-lg max-w-md mx-auto realtive"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <AddGuestsCounter />
          <p
            className="link underline cursor-pointer"
            onClick={guestsModalHandler}
          >
            Select guests
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
          <button
            className="btn-secondary self-center"
            onClick={filterModalHandler}
          >
            Apply
          </button>
        </div>
      </Modal>

      <div className="text-center w-80 mx-auto my-5 sm:hidden">
        {/* Welcome (mobile) */}
        <h1>Check Into a Fairytale</h1>
        <p>
          Sleep in real castles, wake to real magic. Or why not join us for
          ghost hunting? With Nobal Stay, your storybook stay begins for real.
        </p>
      </div>

      <div className="ml-1 sm:mt-8 sm:mx-5">
        {/* Scandinavia castles carousel */}
        <h2 className="ml-2 md:hidden">Scandinavia</h2>
        <h3 className="hidden ml-2 md:block">Scandinavia</h3>

        <div>
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="-ml-1">
              {listings.map((c) => (
                <CarouselItem className="basis-auto" key={c._id}>
                  <CastleCardSmall castle={c} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Sweden castles carousel */}
        <h2 className="ml-2 md:hidden">Sweden</h2>
        <h3 className="hidden ml-2 md:block">Sweden</h3>
        <div>
          <Carousel>
            <CarouselContent className="-ml-1">
              {listings.map((c) => (
                <CarouselItem className="basis-auto" key={c._id}>
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
