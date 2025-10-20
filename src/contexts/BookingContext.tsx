import { dummyBookings } from "@/data/bookings";
import { createContext, useContext, useState, type PropsWithChildren } from "react"

type BookingState = {
    bookings: Booking[],
    actions: {
        createBooking: (booking: Booking) => void;
        getBookingsByUser: (user: User) => Booking[] | undefined;
    }
}

const defaultState: BookingState = {
    bookings: [],
    actions: {
        createBooking: () => {},
        getBookingsByUser: () => undefined
    }
}

const BookingContext = createContext<BookingState>(defaultState) 

function BookingProvider ({ children }: PropsWithChildren){

    const [bookings, setBookings] = useState<Booking[]>(dummyBookings)

    // Private functions
    const _setBookings = (_bookings: Booking[]) => {
        setBookings(_bookings)
    }

    // Public functions
    const createBooking: typeof defaultState.actions.createBooking = (booking: Booking) => {
        const updatedBookings = [...bookings, booking]
        _setBookings(updatedBookings)
    }

    const getBookingsByUser: typeof defaultState.actions.getBookingsByUser = (user: User) => {
        const bookingsByUser: Booking[] | undefined = bookings.filter(booking => booking.bookedUser == user)
        if(bookingsByUser == undefined) {
            console.log('Error: Booking/s could not be found')
            return bookingsByUser
        }
        return bookingsByUser
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