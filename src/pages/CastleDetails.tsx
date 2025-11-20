import AddGuestsCounter from "../components/AddGuestsCounter";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCastleListing } from "@/contexts/CastleListingContext";
import DateCalendar from "@/components/DateCalendar";
import axios from "@/axios_api/axios";

import profilePic from "../assets/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg";
import locationIcon from "../assets/Location_On.svg";
import calendarIcon from "../assets/Calendar_Month.svg";
import guestsIcon from "../assets/Groups.svg";
import bedIcon from "../assets/King_bed.svg";
import filterIcon from "../assets/Filter_Alt.svg";
import shareIcon from "../assets/Share.svg";

import type { DateRange } from "react-day-picker";

const CastleDetails = () => {
  const params = useParams();
  const { selectedRooms, selectedGuests, selectedDates, actions } =
    useCastleListing();

  const [listing, setListing] = useState<CastleListing | undefined>();
  const [listingDates, setListingDates] = useState<DateRange | undefined>();
  const [totalSum, setTotalSum] = useState<number>();
  const [loading, setLoading] = useState(false);

  if (!params.id) {
    console.log("404: Not found");
    return;
  }

  const updateDates = (dates: DateRange) => {
    setListingDates(dates);
    actions.updateSelectedDates(dates);
  };

  useEffect(() => {
    const getListing = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`api/listings/${params.id}`);

        if (res.status !== 200) return;

        setListing(res.data);

        if (selectedDates == undefined) {
          setListingDates({
            from: new Date(res.data.dates[0]),
            to: new Date(res.data.dates[res.data.dates.length - 1]),
          });
          actions.updateSelectedDates({
            from: new Date(res.data.dates[0]),
            to: new Date(res.data.dates[res.data.dates.length - 1]),
          });
        } else {
          setListingDates(selectedDates);
        }

        return;
      } catch (error: any) {
        console.log(error.message);
        return;
      } finally {
        setLoading(false);
        return;
      }
    };
    getListing();
    getTotalSum();
  }, [selectedRooms]);

  const navigate = useNavigate();

  const getTotalSum = () => {
    const updatedSelectedRooms = [...selectedRooms];
    let totalSum = 0;

    let roomQuantity: number[] = [];
    let roomsSum: number[] = [];

    for (let i = 0; i < updatedSelectedRooms.length; i++) {
      roomQuantity.push(1);
    }

    updatedSelectedRooms.forEach((room) => {
      roomsSum.push(room.price);
    });

    for (let i = 0; i < roomQuantity.length; i++) {
      totalSum += roomQuantity[i] * roomsSum[i];
    }

    setTotalSum(totalSum);
  };

  return (
    <div className="m-auto px-5 sm:px-15 md:px-15 md:py-10">
      <button className="my-6 sm:text-xs" onClick={() => navigate(-1)}>
        {"<"} Go back to listings
      </button>
      {loading && <p>Loading castle...</p>}
      {/* Full castle details */}
      {listing && (
        <div>
          {/* Castle image */}
          <div className="sm:w-full">
            <img
              className="rounded-xl h-60 md:h-100 md:w-full"
              src={listing.images[0]}
              alt=""
            />
          </div>
          {/* listing information */}
          <div className="sm:flex sm:justify-between sm:gap-5 md:relative">
            <div className="sm:w-3xl md:w-4xl">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center sm:items-baseline">
                  <h1>{listing.title}</h1>
                  <button className="h-fit caption bg-[url(assets/Share_mobile.svg)] bg-no-repeat bg-position-[10px] pl-9 px-5 py-1.5 rounded-4xl custom-shadow">
                    Share
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {listing.events?.map((event) => (
                    <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                      {event.label}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-3">
                <div>
                  <p>{listing.description} </p>
                  <button className="link bg-[url(assets/Action_arrow_down.svg)] bg-no-repeat bg-position-[60px] pr-4 py-1.5">
                    Expand
                  </button>
                </div>
                <div>
                  <ul className="caption flex flex-col gap-1">
                    {listing.amneties?.map((a) => (
                      <li>{a.label}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col my-5">
                <div>
                  <p>Rules</p>
                  <ul className="caption flex flex-col gap-1">
                    {listing.rules.map((r) => (
                      <li className="text-(--gray)">{r.label}</li>
                    ))}
                  </ul>
                </div>
                <a className="underline link" href="">
                  Full details {">"}
                </a>
              </div>
            </div>

            <hr className="w-85 m-auto border-(--color-gray) sm:hidden" />
            {/* <hr className="hidden absolute sm:block rotate-90 w-85 border-(--color-gray) bottom-45 right-100" /> */}

            <hr className="hidden md:block rotate-90 w-[50%] mt-50 border-(--color-gray)" />

            {/* castle owner details */}
            <div className="sm:flex-col sm:w-60 md:w-lg">
              <div className="flex my-5 justify-between sm:flex-row-reverse sm:gap-2">
                <div className="w-60 md:w-80">
                  <h2 className="text-(--color-foreground) sm:hidden">
                    Meet the castle owner
                  </h2>
                  <h4 className="hidden sm:block text-(--color-foreground)">
                    Meet the castle owner
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    ac turpis tristique.
                  </p>
                </div>
                <div className="flex flex-col items-end sm:items-center md:w-50">
                  {/* PLaceholder image by Joseph Gonzalez at Unsplash.com */}
                  <div className="bg-[url(assets/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg)] bg-cover bg-no-repeat bg-center w-[70px] h-[70px] rounded-full sm:w-[40px] sm:h-[40px]"></div>
                  {/* <img className="rounded-full w-[70px] h-[70px]" src={profilePic} alt="" /> */}
                  <p>★★★★★</p>
                  <a
                    className="caption link underline bg-[url(assets/Mail.svg)] bg-no-repeat bg-position-[0px] pl-6"
                    href=""
                  >
                    Contact host
                  </a>
                </div>
              </div>
              {/* Location details */}
              <div className="hidden sm:flex sm:flex-col md:ml-10">
                <h4 className="text-(--color-foreground)">Location</h4>
                <p> {listing.location}</p>
              </div>
            </div>
          </div>

          <hr className="w-85 m-auto border-(--color-gray) sm:w-xl md:w-7xl md:my-10" />

          {/* Location details */}
          <div className="flex flex-col my-5 sm:hidden">
            <h2 className="text-(--color-foreground)">Location</h2>
            <p> {listing.location}</p>
          </div>

          <hr className="w-85 m-auto border-(--color-gray) sm:hidden" />

          <div className="sm:flex sm:w-full sm:justify-around sm:mt-5">
            <div className="sm:flex sm:flex-col md:w-4xl">
              {/* Select dates */}
              <div className="flex flex-col my-5 sm:my-0">
                <div className="flex gap-2 items-center">
                  <img src={calendarIcon} alt="" />
                  <h2 className="text-(--color-foreground) sm:hidden">
                    Select dates
                  </h2>
                  <h4 className="hidden sm:block text-(--color-foreground)">
                    Select dates
                  </h4>
                </div>
                <DateCalendar
                  selected={listingDates}
                  onChange={updateDates}
                  disabledDates={listing.dates}
                />
              </div>

              {/* Select guests */}
              <div className="flex flex-col my-5 gap-3 md:w-100">
                <div className="flex gap-2 items-center">
                  <img src={guestsIcon} alt="" />
                  <h2 className="text-(--color-foreground) sm:hidden">
                    Select how many guests
                  </h2>
                  <h4 className="hidden sm:block text-(--color-foreground)">
                    Select how many guests
                  </h4>
                </div>
                <AddGuestsCounter castleListing={listing} />
              </div>
            </div>

            {/* Select Room */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <img src={bedIcon} alt="" />
                <h2 className="text-(--color-foreground) sm:hidden">
                  Select a room
                </h2>
                <h4 className="hidden sm:block text-(--color-foreground)">
                  Select a room
                </h4>
              </div>
              <div className="flex flex-col gap-5">
                {listing.rooms.map((room) => (
                  <RoomCard
                    room={room}
                    isBookingRoom={true}
                    isRoomInCastleListing={
                      selectedRooms.find((r) => r.title == room.title) ==
                      undefined
                        ? false
                        : true
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Total price and reserve */}
          <div className="flex justify-between items-end my-8 md:flex-col-reverse md:justify-center md:mb-0">
            <div className="md:flex md:gap-2 md:items-center md:mr-13 md:mt-5">
              <p>Total:</p>
              <p className="underline text-(--color-primary)">{totalSum} SEK</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="caption text-(--color-gray)">
                You will not be charged yet
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate(`/book/?id=${listing._id}`)}
                disabled={
                  selectedRooms.length == 0 ||
                  listingDates == undefined ||
                  selectedGuests.filter((guest) => guest.number == 0).length ==
                    3
                    ? true
                    : false
                }
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CastleDetails;
