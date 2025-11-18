import axios from "@/axios_api/axios";
import LocalStorageService from "@/utils/LocalStorageService";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
// import { useNavigate } from "react-router";

type BookingState = {
  bookings: Booking[];
  // setBookings: typeof useState<Booking[] | null>,
  actions: {
    createBooking: (booking: BookingInputs, token: string) => void;
    setAllBookings: (bookings: Booking[]) => void;
  };
};

const defaultState: BookingState = {
  bookings: [],
  actions: {
    createBooking: () => {},
    setAllBookings: () => {},
  },
};

const BookingContext = createContext<BookingState>(defaultState);

function BookingProvider({ children }: PropsWithChildren) {
  const [bookings, setBookings] = useState<Booking[]>(defaultState.bookings);
  const [userBookings, setUserBookings] = useState<Booking[] | null>(
    defaultState.bookings
  );

  // Public functions
  const createBooking: typeof defaultState.actions.createBooking = async (
    bookingDetails: BookingInputs,
    token: string
  ) => {
    try {
      const res = await axios.post(`api/bookings`, bookingDetails, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        console.log(res.data);
      }

      const updatedBookings = [...bookings, res.data];
      setAllBookings(updatedBookings);
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };

  const setAllBookings = (bookings: Booking[]) => {
    setBookings(bookings);
    setUserBookings(bookings);
    LocalStorageService.setItem<Booking[]>("@booking/bookings", bookings);
  };

  const actions = {
    createBooking,
    setAllBookings,
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        actions,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be called within a BookingProvider");
  }
  return context;
}

export { BookingProvider, useBooking };
