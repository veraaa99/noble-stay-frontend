import { dummyBookings } from "@/data/bookings";
import { createContext, useContext, useState, type PropsWithChildren } from "react"

type BookingState = {
    bookings: Booking[],
    actions: {
        createBooking: (booking: Booking) => void;
        getBookingsByUser: (user: User) => Booking[] | null;
    }
}

const defaultState: BookingState = {
    bookings: [],
    actions: {
        createBooking: () => {},
        getBookingsByUser: () => null
    }
}

const BookingContext = createContext<BookingState>(defaultState) 

function BookingProvider ({ children }: PropsWithChildren){

    const [bookings, setBookings] = useState(dummyBookings)

    const createBooking: typeof defaultState.actions.createBooking = (booking: Booking) => {

    }

    const getBookingsByUser: typeof defaultState.actions.getBookingsByUser = (user: User) => {
        return [dummyBookings[0]]
    }

    const actions = {
        createBooking,
        getBookingsByUser
    }

  return (
    <BookingContext.Provider value={{
        bookings,
        actions
    }}>
        { children }
    </BookingContext.Provider>
  )
}

function useBooking() {
    const context = useContext(BookingContext)
     if( context === undefined ) {
        throw new Error('useBooking must be called within a BookingProvider')
    }
    return context
}

export { BookingProvider, useBooking }