import { useState } from "react"

const Booking = () => {

    const [bookingConfirmed, setBookingConfirmed] = useState(false)

  return (
    <div>
        {/* Castle information summary */}
        <div>
          <div>
            <h1>Booking summary</h1>
            {/* Castle image */}
            <div>
              <img src="" alt="" />
            </div>
          </div>

          {/* Castle information */}
          <div>
            <h2>DummyTitle</h2>
            <p>DummyLocation</p>
            <p>DummyRules</p>
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