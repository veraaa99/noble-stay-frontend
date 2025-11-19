import { useNavigate, useSearchParams } from "react-router";
import PaymentOptions from "../components/PaymentOptions";
import RegisterForm from "../components/RegisterForm";
import { useCastleListing } from "@/contexts/CastleListingContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import { eachDayOfInterval } from "date-fns";
import axios from "@/axios_api/axios";

import locationIcon from "../assets/Location_On.svg";

const PlaceBooking = () => {
  const [searchParams] = useSearchParams();

  const {
    selectedDates,
    selectedGuests,
    selectedRooms,
    actions: castleListingActions,
  } = useCastleListing();
  const { currentUser, token } = useUser();
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [castle, setCastle] = useState<CastleListing | undefined>();
  const [totalSum, setTotalSum] = useState<number>();

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
    getListing();
    getTotalSum();
  }, []);

  // const newAllGuests: Guest[] = [...selectedGuests];
  // const totalAmountOfGuests: number[] = newAllGuests.map((g) => g.number);

  // let sum = 0;
  // let i = 0;
  // for (i = 0; i < totalAmountOfGuests.length; i++) {
  //   sum += totalAmountOfGuests[i];
  // }

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
      bookedRooms: selectedRooms,
      bookedGuests: selectedGuests,
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

      navigate(`/confirmed?bookingId=${res.data._id}`);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };

  const loginModalHandler = () => {
    setIsLoginModalOpen((isLoginModalOpen) => !isLoginModalOpen);
  };

  return (
    <div className="m-auto px-7 pt-10">
      {castle && (
        <div>
          <button className="my-6" onClick={() => navigate(-1)}>
            {"<"} Go back without booking
          </button>

          <div>
            {/* Castle information summary */}
            <div>
              <div className="flex flex-col gap-2">
                <h1>Booking summary</h1>
                {/* Castle image */}
                <div>
                  <img
                    className="rounded-xl h-50"
                    src={castle.images[0]}
                    alt=""
                  />
                </div>
              </div>

              {/* Castle information */}
              <div className="my-5">
                <h2>{castle.title}</h2>
                <div className="flex gap-1">
                  <img src={locationIcon} alt="" />

                  <p>{castle.location}</p>
                </div>
                <ul className="caption flex flex-col gap-1">
                  {castle.rules.map((r) => (
                    <li className="text-(--gray)">{r.label}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking details */}
            <div className="flex flex-col gap-4 mb-5">
              <hr className="w-80 m-auto border-(--gray)" />
              <div>
                <h2 className="text-(--color-foreground)">Date:</h2>
                <div>
                  {/* TODO: Add selected dates */}
                  <p>{`${selectedDates?.from?.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} → ${selectedDates?.to?.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`}</p>
                </div>
              </div>
              <hr className="w-80 m-auto border-(--gray)" />
              <div>
                <h2 className="text-(--color-foreground)">Room/s:</h2>
                {/* <p>{castle.rooms[0].title}</p> */}
                {selectedRooms.map((r) => (
                  <div className="flex gap-2">
                    <p>1 {r.title}</p>
                  </div>
                ))}
              </div>
              <hr className="w-80 m-auto border-(--gray)" />
              <div>
                <h2 className="text-(--color-foreground)">Guests:</h2>
                {selectedGuests.map((g) => (
                  <div className="flex gap-2">
                    <p>{g.number}</p>
                    <p>{g.category}</p>
                  </div>
                ))}
              </div>
              <hr className="w-80 m-auto border-(--gray)" />
              <div>
                <h2 className="text-(--color-foreground)">Total:</h2>
                <p>{totalSum} SEK</p>
              </div>
            </div>
          </div>
          {currentUser ? (
            // IF LOGGED IN: Select payment method
            <div className="flex flex-col items-center mb-15">
              <h2>Select payment method</h2>
              <p className="caption mb-3">
                Disclaimer: you will not be charged
              </p>
              <PaymentOptions />
              <button className="btn-action mt-5" onClick={handleBookingSubmit}>
                Book
              </button>
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
