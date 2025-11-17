import { useNavigate, useSearchParams } from "react-router";
import PaymentOptions from "../components/PaymentOptions";
import RegisterForm from "../components/RegisterForm";
import { useBooking } from "@/contexts/BookingContext";
import { useCastleListing } from "@/contexts/CastleListingContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import { eachDayOfInterval } from "date-fns";
import axios from "@/axios_api/axios";

const PlaceBooking = () => {
  const [searchParams] = useSearchParams();
  // const { bookings, actions: bookingActions } = useBooking()
  const {
    selectedDates,
    selectedGuests,
    actions: castleListingActions,
  } = useCastleListing();
  const { currentUser, token } = useUser();
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [castle, setCastle] = useState<CastleListing | undefined>();

  const castleId = searchParams.get("id");

  if (!castleId) {
    console.log("404: Not found");
    return;
  }

  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await axios.get(`api/listings/${castleId}`);

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

  const newAllGuests: Guest[] = [...selectedGuests];
  const totalAmountOfGuests: number[] = newAllGuests.map((g) => g.number);

  let sum = 0;
  let i = 0;
  for (i = 0; i < totalAmountOfGuests.length; i++) {
    sum += totalAmountOfGuests[i];
  }

  const handleBookingSubmit = async () => {
    if (!castle) {
      console.log(
        "Error: No castle listing found, booking could not be completed"
      );
      return;
    } else if (currentUser == null) {
      console.log("Error: You must be logged in to place a booking");
      return;
    } else if (
      selectedDates == undefined ||
      selectedDates?.from == undefined ||
      selectedDates?.to == undefined
    ) {
      console.log("Error: No selected dates could be found");
      return;
    }

    const allBookedDates = eachDayOfInterval({
      start: selectedDates.from,
      end: selectedDates.to,
    });

    const newBooking: BookingInputs = {
      castle: castle._id,
      bookedDates: allBookedDates,
      bookedRooms: castle.rooms,
      bookedGuests: selectedGuests,
      // bookedEvents: castle.events,
    };

    try {
      const res = await axios.post(`api/bookings`, newBooking, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        console.log(res.data);
      }

      // const updatedBookings = [...bookings, res.data]
      // bookingActions.setBookings(updatedBookings)
      navigate(`/confirmed?bookingId=${res.data._id}`);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const loginModalHandler = () => {
    setIsLoginModalOpen((isLoginModalOpen) => !isLoginModalOpen);
  };

  return (
    <div>
      {castle && (
        <div>
          <button onClick={() => navigate("/")}>Go back without booking</button>

          <div>
            {/* Castle information summary */}
            <div>
              <div>
                <h1>Booking summary</h1>
                {/* Castle image */}
                <div>
                  <img src={castle.images[0]} alt="" />
                </div>
              </div>

              {/* Castle information */}
              <div>
                <h2>{castle.title}</h2>
                <p>{castle.location}</p>
                <ul className="caption flex flex-col gap-1">
                  {castle.rules.map((r) => (
                    <li>{r.label}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking details */}
            <div>
              <hr />
              <div>
                <h3>Date:</h3>
                <div>
                  {/* TODO: Add selected dates */}
                  <p>{`${selectedDates?.from?.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} - ${selectedDates?.to?.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`}</p>
                </div>
              </div>
              <hr />
              <div>
                <h3>Room/s:</h3>
                <p>{castle.rooms[0].title}</p>
              </div>
              <hr />
              <div>
                <h3>Guests:</h3>
                {selectedGuests.map((g) => (
                  <>
                    <p>{g.number}</p>
                    <p>{g.category}</p>
                  </>
                ))}
              </div>
              <hr />
              <div>
                <h3>Total:</h3>
                <p>{sum * castle.rooms[0].price}</p>
              </div>
            </div>
          </div>
          {currentUser ? (
            // IF LOGGED IN: Select payment method
            <div>
              <h2>Select payment method</h2>
              <p>Disclaimer: you will not be charged</p>
              <PaymentOptions />
              <button onClick={handleBookingSubmit}>Book</button>
            </div>
          ) : (
            // IF NOT LOGGED IN: Sign up form
            <div>
              <h1>Sign up to Noble Stay to continue to payment</h1>
              <RegisterForm />
              <p>Already have an account?</p>{" "}
              <p onClick={loginModalHandler}>LOG IN</p>
            </div>
          )}
          {isLoginModalOpen && (
            <div>
              <p onClick={loginModalHandler}>X</p>
              <LoginForm setIsLoginModalOpen={setIsLoginModalOpen} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default PlaceBooking;
