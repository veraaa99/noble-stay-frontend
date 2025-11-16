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

const CastleDetails = () => {
  const params = useParams();
  const { actions } = useCastleListing();

  const [listing, setListing] = useState<CastleListing | undefined>();

  if (!params.id) {
    console.log("404: Not found");
    return;
  }

  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await axios.get(`api/listings/${params.id}`);

        if (res.status !== 200) return;

        setListing(res.data);
        // setImgSrc(res.data.images)
        // setBigImage(res.data.images[0])
        return;
      } catch (error: any) {
        console.log(error.message);
        return;
      }
    };
    getListing();
  }, []);

  const navigate = useNavigate();

  // const castle: CastleListing | undefined  = actions.getListingByID(parseInt(params.castleId))

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
                  {event}
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
                    <li>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col my-5">
              <div>
                <p>Rules</p>
                <ul className="caption flex flex-col gap-1">
                  {listing.rules.map((r) => (
                    <li>{r}</li>
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
            <img src="" alt="" />
          </div>

          <hr className="w-85 m-auto border-(--color-gray)" />

          {/* Select dates */}
          <div className="flex flex-col my-5">
            <h2 className="text-(--color-foreground)">Select dates</h2>
            <DateCalendar />
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
            {listing.rooms.map((r) => (
              <RoomCard room={r} isBookingRoom={true} />
            ))}
          </div>

          {/* Total price and reserve */}
          <div className="flex justify-between items-end my-5">
            <div>
              <p>Total:</p>
              <p className="underline text-(--color-primary)">DummyPrice SEK</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="caption text-(--color-gray)">
                You will not be charged yet
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate(`/book/?id=${listing._id}`)}
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
