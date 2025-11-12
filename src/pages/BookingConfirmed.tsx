import { useNavigate, useSearchParams } from "react-router"
import Booking from "../components/Booking"
import { useBooking } from "@/contexts/BookingContext"
import { useEffect, useState } from "react"
import axios from "@/axios_api/axios"
import { useUser } from "@/contexts/UserContext"

const BookingConfirmed = () => {

  const { token } = useUser()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { actions } = useBooking()

  const bookingId = searchParams.get('bookingId')
  const [booking, setBooking] = useState<Booking | undefined>()

   if(!bookingId) {
    console.log('404: Booking not found')
    return
  }

  useEffect(() => {
    getConfirmedBooking()
  }, [])

  const getConfirmedBooking = async() => {
    try {
      const res = await axios.get(`/api/bookings/${bookingId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
  
      if(res.status !== 200) return
  
      setBooking(res.data)
      return
      
    } catch (err: any) {
      console.log(err.response?.data?.message || 'Something went wrong')
      return
    }
  }

  return (
    <div>
      {
        booking &&
        <>
          <div>
            <p>✓</p>
            <h1>Booking completed!</h1>
            <p>A booking confirmation has been sent to your mail.</p>
          </div>
    
          <p>Summary:</p>
          {/* Booking summary */}
          <Booking booking={booking} />
    
          <div>
            <p>Download this booking</p>
          </div>
    
          <button onClick={() => navigate('/')}>Back to start</button>
        </>
      }
    </div>
  )
}
export default BookingConfirmed