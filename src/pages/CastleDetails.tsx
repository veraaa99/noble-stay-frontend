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
import filterIcon from "../assets/Filter_Alt.svg";
import type { DateRange } from "react-day-picker";

const CastleDetails = () => {
  const params = useParams();
  const { selectedRooms, selectedGuests, selectedDates, actions } =
    useCastleListing();

  const [listing, setListing] = useState<CastleListing | undefined>();
  const [listingDates, setListingDates] = useState<DateRange | undefined>();
  const [totalSum, setTotalSum] = useState<number>();

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
        // setListingDates({
        //   from: new Date(res.data.dates[0]),
        //   to: new Date(res.data.dates[res.data.dates.length - 1]),
        // });

        return;
      } catch (error: any) {
        console.log(error.message);
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
    <div className="m-auto px-5">
      <button>Go back to listings</button>
      {/* Full castle details */}
      {listing && (
        <div>
          {/* Castle image */}
          <div>
            <img className="rounded-xl h-60" src={listing.images[0]} alt="" />
          </div>
          {/* listing information */}
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h1>{listing.title}</h1>
                <button>Share</button>
              </div>
              {listing.events?.map((event) => (
                <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                  {event.label}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-3">
              <div>
                <p>{listing.description} </p>
                <button className="underline">Expand</button>
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
                    <li>{r.label}</li>
                  ))}
                </ul>
              </div>
              <a className="underline" href="">
                Full details
              </a>
            </div>
          </div>

          <hr className="w-85 m-auto border-(--color-gray)" />

          {/* castle owner details */}
          <div className="flex my-5">
            <div>
              <h2 className="text-(--color-foreground)">
                Meet the castle owner
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac
                turpis tristique.{" "}
              </p>
            </div>
            <div>
              {/* PLaceholder image by Joseph Gonzalez at Unsplash.com */}
              <div className="bg-[url(assets/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg)] bg-cover bg-no-repeat bg-center w-[70px] h-[70px] rounded-full"></div>
              {/* <img className="rounded-full w-[70px] h-[70px]" src={profilePic} alt="" /> */}
              <p>DummyStars</p>
              <a className="underline" href="">
                Contact host
              </a>
            </div>
          </div>

          <hr className="w-85 m-auto border-(--color-gray)" />

          {/* Location details */}
          <div className="flex flex-col my-5">
            <h2 className="text-(--color-foreground)">Location</h2>
            <p> {listing.location}</p>
          </div>

          <hr className="w-85 m-auto border-(--color-gray)" />

          {/* Select dates */}
          <div className="flex flex-col my-5">
            <h2 className="text-(--color-foreground)">Select dates</h2>
            <DateCalendar
              selected={listingDates}
              onChange={updateDates}
              disabledDates={listing.dates}
            />
          </div>

          {/* Select guests */}
          <div className="flex flex-col my-5 gap-3">
            <h2 className="text-(--color-foreground)">
              Select how many guests
            </h2>
            <AddGuestsCounter castleListing={listing} />
          </div>

          {/* Select Room */}
          <div className="flex flex-col my-5">
            <h2 className="text-(--color-foreground)">Select a room</h2>
            {listing.rooms.map((room) => (
              <RoomCard
                room={room}
                isBookingRoom={true}
                isRoomInCastleListing={
                  selectedRooms.find((r) => r.title == room.title) == undefined
                    ? false
                    : true
                }
              />
            ))}
          </div>

          {/* Total price and reserve */}
          <div className="flex justify-between items-end my-5">
            <div>
              <p>Total:</p>
              <p className="underline text-(--color-primary)">{totalSum} SEK</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="caption text-(--color-gray)">
                You will not be charged yet
              </p>
              <button
                className="btn-primary disabled:bg-gray-400"
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
