type BookingProps = {
  bookingConfirmed: boolean
}

const Booking = ({ bookingConfirmed }: BookingProps) => {

  return (
    <div>
      {/* Castle information summary */}
      <div>
        { !bookingConfirmed && 
          <div>
            <h1>Booking summary</h1>
            {/* Castle image */}
            <div>
              <img src="" alt="" />
            </div>
          </div>
        }

        {/* Castle information */}
        <div>
          <h2>DummyTitle</h2>
          <p>DummyLocation</p>
          { !bookingConfirmed &&
            <p>DummyRules</p>
          }
        </div>
      </div>

      {/* Booking details */}
      <div>
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
        { bookingConfirmed && 
          <>
            <hr />
            <div>
              <h3>Booking ID:</h3>
              <p>dummyBookingID</p>
            </div>
          </>
        }
        <hr />
        <div>
          <h3>Total:</h3>
          <p>dummyNumber</p>
        </div>
      </div>
    </div>
  )
}
export default Booking