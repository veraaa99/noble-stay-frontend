import Booking from "../components/Booking"

const BookingConfirmed = () => {
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
      <Booking bookingConfirmed={true} />

      <div>
        <p>Download this booking</p>
      </div>

      <button>Back to start</button>
    </div>
  )
}
export default BookingConfirmed