import { useNavigate, useSearchParams } from "react-router";
import Booking from "../components/Booking";
import { useEffect, useState } from "react";
import axios from "@/axios_api/axios";
import { useUser } from "@/contexts/UserContext";
import checkIcon from "../assets/Check.svg";
import downloadIcon from "../assets/Download.svg";

const BookingConfirmed = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState<Booking | undefined>();

  if (!bookingId) {
    console.log("404: Booking not found");
    return;
  }

  useEffect(() => {
    getConfirmedBooking();
  }, []);

  const getConfirmedBooking = async () => {
    try {
      const res = await axios.get(`/api/bookings/${bookingId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) return;

      setBooking(res.data);
      return;
    } catch (err: any) {
      console.log(err.response?.data?.message || "Something went wrong");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center px-7 pt-10 mb-15 sm:px-40 sm:mx-auto">
      {booking && (
        <>
          <div className="flex-flex-col text-center mb-5 ">
            <div className="flex justify-center">
              <img src={checkIcon} alt="" />
            </div>
            <h1 className="mb-2">Booking completed!</h1>
            <p className="caption">
              A booking confirmation has been sent to your mail.
            </p>
          </div>

          <p className="text-center mb-3">Summary:</p>
          <div className="border-1 border-(--color-gray) rounded-lg px-10 w-full py-5 sm:w-90 lg:w-100">
            {/* Booking summary */}
            <Booking booking={booking} />
          </div>

          <div className="flex gap-1 items-center m-auto my-5">
            <img src={downloadIcon} alt="" />
            <p>Download this booking</p>
          </div>

          <button
            className="btn-secondary m-auto cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back to start
          </button>
        </>
      )}
    </div>
  );
};
export default BookingConfirmed;
