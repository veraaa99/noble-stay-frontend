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
      <div>

        <div>
          <h2>dummyTitle</h2>
          <p>dummyLocation</p>
        </div>
        <hr />
        <div>
          <h3>Date:</h3>
          <div>
            <p>dummyDate</p>
            <p>→</p>
            <p>dummyDate</p>
          </div>
        </div>
        <hr />
        <div>
          <h3>Room:</h3>
          <p>dummyRoom</p>
        </div>
        <hr />
        <div>
          <h3>Guests:</h3>
          <p>dummyGuests</p>
        </div>
        <hr />
        <div>
          <h3>Booking ID:</h3>
          <p>dummyBookingID</p>
        </div>
        <hr />
        <div>
          <h3>Total:</h3>
          <p>dummyNumber</p>
        </div>

      </div>

      <div>
        <p>Download this booking</p>
      </div>

      <button>Back to start</button>
    </div>
  )
}
export default BookingConfirmed