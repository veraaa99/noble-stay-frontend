import { dummyBookings } from "@/data/bookings";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

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

    useEffect(() => {
        _getBookings()
    }, [])

    // Private functions
    const _setBookings = (_bookings: Booking[]) => {
        setBookings(_bookings)
    }

    const _getBookings = () => {
        return bookings
    }

    // Public functions
    const createBooking: typeof defaultState.actions.createBooking = (booking: Booking) => {
        const updatedBookings = [...bookings, booking]
        _setBookings(updatedBookings)
    }

    const getBookingsByUser: typeof defaultState.actions.getBookingsByUser = (user: User) => {
        const newBookings = [...bookings]
        const bookingsByUser: Booking[] | undefined = newBookings.filter(booking => booking.bookedUser.id == user.id)
        if(bookingsByUser == undefined || bookingsByUser.length == 0) {
            console.log('Error: Booking/s could not be found')
            return undefined
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