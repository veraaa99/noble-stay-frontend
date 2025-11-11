import axios from "@/axios_api/axios";
import LocalStorageService from "@/utils/LocalStorageService";
import { createContext, useContext, useState, type PropsWithChildren } from "react"
// import { useNavigate } from "react-router";

type BookingState = {
    bookings: Booking[],
    // setBookings: typeof useState<Booking[] | null>,
    actions: {
        createBooking: (booking: BookingInputs, token: string) => void;
        setAllBookings: (bookings: Booking[]) => void
        // getBookingByID: (id: string, token: string) => Booking | undefined
        // getBookingsByUser: (token: string) => Booking[] | undefined;
    }
}

const defaultState: BookingState = {
    bookings: [],
    actions: {
        createBooking: () => {},
        setAllBookings: () => {},
        // getBookingByID: () => undefined,
        // getBookingsByUser: () => undefined
    }
}

const BookingContext = createContext<BookingState>(defaultState) 

function BookingProvider ({ children }: PropsWithChildren){

    const [bookings, setBookings] = useState<Booking[]>(defaultState.bookings)
    const [userBookings, setUserBookings] = useState<Booking[] | null>(defaultState.bookings)

    // const navigate = useNavigate()

    // Public functions
    const createBooking: typeof defaultState.actions.createBooking = async (bookingDetails: BookingInputs, token: string) => {

        try {
            const res = await axios.post(`api/bookings`, (bookingDetails) , {
            headers: {
                authorization: `Bearer ${token}`
            }
            })

            if(res.status === 201){
                console.log(res.data)
            }

            const updatedBookings = [...bookings, res.data]
            setAllBookings(updatedBookings)

            // setBookings(updatedBookings)
            // setUserBookings(updatedBookings)
            // LocalStorageService.setItem<Booking[]>('@booking/bookings', updatedBookings)

        } catch(error: any) {
            console.log(error.response?.data?.message || 'Something went wrong')
            console.log(error)
        }

    }

    const setAllBookings = (bookings: Booking[]) => {
        setBookings(bookings)
        setUserBookings(bookings)
        LocalStorageService.setItem<Booking[]>('@booking/bookings', bookings)
    }

    // const getBookingByID: typeof defaultState.actions.getBookingByID = async (id: string, token: string) => {
    //     try {
    //         const res = await axios.get(`/api/bookings/${id}`, {
    //             headers: {
    //             authorization: `Bearer ${token}`
    //             }
    //         })
        
    //         if(res.status !== 200) return
    //         return res.data
        
    //     } catch(error: any) {
    //         console.log(error.response?.data?.message || 'Something went wrong')
    //         console.log(error)
    //     }
        
    // }

    // const getBookingsByUser: typeof defaultState.actions.getBookingsByUser = async (token: string) => {
    //     try {
    //         const res = await axios.get('/api/bookings', {
    //             headers: {
    //             authorization: `Bearer ${token}`
    //             }
    //         })
        
    //         if(res.status !== 200) return
        
    //         setUserBookings(res.data)
    //         return
        
    //     } catch(error: any) {
    //         console.log(error.response?.data?.message || 'Something went wrong')
    //         console.log(error)
    //     }

    // }

    const actions = {
        createBooking,
        setAllBookings,
        // getBookingByID,
        // getBookingsByUser
    }

  return (
    <BookingContext.Provider value={{
        bookings,
        // setBookings,
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