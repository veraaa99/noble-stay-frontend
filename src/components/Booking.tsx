type BookingProps = {
  booking: Booking
}

const Booking = ({ booking }: BookingProps) => {

  return (
    <div>
      {/* Castle information summary */}
      <div>
        {/* { !bookingConfirmed &&  */}
          <div>
            <h1>Booking summary</h1>
            {/* Castle image */}
            <div>
              <img src={booking.castle.images[0]} alt="" />
            </div>
          </div>
        {/* } */}

        {/* Castle information */}
        <div>
          <h2>{booking.castle.title}</h2>
          <p>{booking.castle.location}</p>
          {/* { !bookingConfirmed && */}
            <p>{booking.castle.rules}</p>
          {/* } */}
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
            <p>{booking.bookedDates[2]}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3>Room:</h3>
          <p>{booking.bookedRooms[0].title}</p>
        </div>
        <hr />
        <div>
          <h3>Guests:</h3>
          <p>{booking.bookedGuests[0].number} {booking.bookedGuests[0].category}</p>
        </div>
        {/* { bookingConfirmed &&  */}
          {/* <> */}
            <hr />
            <div>
              <h3>Booking ID:</h3>
              <p>{booking.bookingId}</p>
            </div>
          {/* </> */}
        {/* } */}
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