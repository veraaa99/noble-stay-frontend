type BookingProps = {
  booking: Booking
}

const Booking = ({ booking }: BookingProps) => {

  return (
    <div>
      {/* Castle information summary */}
      <div>
          <div>
            <h1>Booking summary</h1>
            {/* Castle image */}
            <div>
              <img src={booking.castle.images[0]} alt="" />
            </div>
          </div>

        {/* Castle information */}
        <div>
          <h2>{booking.castle.title}</h2>
          <p>{booking.castle.location}</p>
          <p>{booking.castle.rules}</p>
        </div>
      </div>

      {/* Booking details */}
      <div>
        <hr />
        <div>
          <h3>Date:</h3>
          <div>
            <p>{booking.bookedDates[0]}</p>
            <p>→</p>
            <p>{booking.bookedDates[booking.bookedDates.length-1]}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3>Room:</h3>
          { booking.bookedRooms.map(r => 
            <p>{r.title}</p>
          )}
        </div>
        <hr />
        <div>
          <h3>Guests:</h3>
          { booking.bookedGuests.map(g => 
          <p>{g.number} {g.category}</p>
          )}
        </div>
            <hr />
            <div>
              <h3>Booking ID:</h3>
              <p>{booking.bookingId}</p>
            </div>
        <hr />
        <div>
          <h3>Total:</h3>
          <p>{booking.totalPrice}</p>
        </div>
      </div>
    </div>
  )
}
export default Booking