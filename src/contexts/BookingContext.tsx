import { createContext, useContext, type PropsWithChildren } from "react"

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
  return (
    <div>CastleListingContext</div>
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