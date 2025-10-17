import { useNavigate } from "react-router"
import Booking from "../components/Booking"
import { dummyBookings } from "../data/bookings"

const BookingConfirmed = () => {

  const navigate = useNavigate()

  return (
    <div>
      {/* Booking confirmed title */}
      <div>
        <p>✓</p>
        <h1>Booking completed!</h1>
        <p>A booking confirmation has been sent to your mail.</p>
      </div>

      <p>Summary:</p>
      {/* Booking summary */}
      <Booking booking={dummyBookings[0]} bookingConfirmed={true} />

      <div>
        <p>Download this booking</p>
      </div>

      <button onClick={() => navigate('/')}>Back to start</button>
    </div>
  )
}
export default BookingConfirmed