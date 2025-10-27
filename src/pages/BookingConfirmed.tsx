import { useNavigate, useSearchParams } from "react-router"
import Booking from "../components/Booking"
import { useBooking } from "@/contexts/BookingContext"

const BookingConfirmed = () => {

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const { actions } = useBooking()

  const bookingId = searchParams.get('bookingId')

  if(!bookingId) {
    console.log('404: Booking not found')
    return
  }

  const confirmedBooking: Booking | undefined = actions.getBookingByID(parseInt(bookingId))

  return (
    <div>
      {
        confirmedBooking &&
        <>
          <div>
            <p>✓</p>
            <h1>Booking completed!</h1>
            <p>A booking confirmation has been sent to your mail.</p>
          </div>
    
          <p>Summary:</p>
          {/* Booking summary */}
          <Booking booking={confirmedBooking} />
    
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