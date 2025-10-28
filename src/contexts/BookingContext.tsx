import LocalStorageService from "@/utils/LocalStorageService";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

type BookingState = {
    bookings: Booking[],
    actions: {
        createBooking: (booking: Booking) => void;
        getBookingByID: (id: number) => Booking | undefined
        getBookingsByUser: (user: User) => Booking[] | undefined;
    }
}

const defaultState: BookingState = {
    bookings: [],
    actions: {
        createBooking: () => {},
        getBookingByID: () => undefined,
        getBookingsByUser: () => undefined
    }
}

const BookingContext = createContext<BookingState>(defaultState) 

function BookingProvider ({ children }: PropsWithChildren){

    const [bookings, setBookings] = useState<Booking[]>(defaultState.bookings)

    useEffect(() => {
        _getBookings()
    }, [])

    // Private functions
    const _getBookings = () => {
        const _bookings: Booking[] = LocalStorageService.getItem('@booking/bookings', defaultState.bookings)
        setBookings(_bookings)
    }

    // Public functions
    const createBooking: typeof defaultState.actions.createBooking = (booking: Booking) => {
        const updatedBookings = [...bookings, booking]
        setBookings(updatedBookings)
        LocalStorageService.setItem<Booking[]>('@booking/bookings', updatedBookings)
    }

    const getBookingByID: typeof defaultState.actions.getBookingByID = (id: number) => {
        const bookingByID: Booking | undefined = bookings.find(booking => booking.bookingId == id)
        if(bookingByID == undefined) {
            console.log('Error: Booking could not be found')
            return undefined
        }
        
        return bookingByID 
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
        getBookingByID,
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