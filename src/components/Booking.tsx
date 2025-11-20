import axios from "@/axios_api/axios";
import { useEffect, useState } from "react";

import locationIcon from "../assets/Location_On.svg";

type BookingProps = {
  booking: Booking;
};

const Booking = ({ booking }: BookingProps) => {
  const [castle, setCastle] = useState<CastleListing | undefined>();

  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await axios.get(`api/listings/${booking.castle._id}`);

        if (res.status !== 200) return;

        setCastle(res.data);

        return;
      } catch (error: any) {
        console.log(error.message);
        return;
      }
    };
    getListing();
  }, []);

  return (
    <div>
      {castle && (
        <>
          <div>
            <div className="mb-5 flex flex-col gap-1.5">
              <h2>{castle.title}</h2>
              <div className="flex gap-1 items-center">
                <img src={locationIcon} alt="" />
                <p className="caption">{castle.location}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <hr className="w-[90%] sm:w-70 m-auto border-(--gray)" />
            <div>
              <h2 className="text-(--color-foreground)">Date:</h2>
              <div>
                <p>
                  {new Date(booking.bookedDates[0].toString()).toLocaleString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}{" "}
                  →{" "}
                  {new Date(
                    booking.bookedDates[booking.bookedDates.length - 1]
                  ).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <hr className="w-[90%] sm:w-70 m-auto border-(--gray)" />
            <div>
              <h2 className="text-(--color-foreground)">Room/s:</h2>
              {booking.bookedRooms.map((r) => (
                <div className="flex gap-2">
                  <p>1 {r.title}</p>
                </div>
              ))}
            </div>
            <hr className="w-[90%] sm:w-70 m-auto border-(--gray)" />
            <div>
              <h2 className="text-(--color-foreground)">Guests:</h2>
              {booking.bookedGuests.map((g) => (
                <div className="flex gap-2">
                  <p>{g.number}</p>
                  <p>{g.category}</p>
                </div>
              ))}
            </div>
            <hr className="w-[90%] sm:w-70 m-auto border-(--gray)" />
            <div>
              <h2 className="text-(--color-foreground)">Booking ID:</h2>
              <p>{booking._id}</p>
            </div>
            <hr className="w-[90%] sm:w-70 m-auto border-(--gray)" />
            <div>
              <h2 className="text-(--color-foreground)">Total:</h2>
              <p>{booking.totalPrice} SEK</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Booking;
