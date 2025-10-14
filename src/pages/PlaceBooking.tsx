import RegisterForm from "../components/RegisterForm"

const PlaceBooking = () => {
  return (
    <div>
      <button>Go back without booking</button>
      {/* Full booking summary */}
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

      {/* IF NOT LOGGED IN: Sign up form */}
      <div>
        <RegisterForm />
      </div>

      {/* IF LOGGED IN: Select payment method */}
      <div>
        <h2>Select payment method</h2>
        {/* <p>Disclaimer: you will not be charged</p>  */}
        <div>
          <div>
            <p>Credit card</p>
            <input type="radio" name="" id="" />
          </div>
          <div>
            <p>PayPal</p>
            <input type="radio" name="" id="" />
          </div>
          <div>
            <p>Swish</p>
            <input type="radio" name="" id="" />
          </div>
        </div>
        <button>Book</button>
      </div>

    </div>
  )
}
export default PlaceBooking