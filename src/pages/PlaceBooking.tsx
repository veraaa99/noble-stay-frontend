import Booking from "../components/Booking"
import PaymentOptions from "../components/PaymentOptions"
import RegisterForm from "../components/RegisterForm"

const PlaceBooking = () => {
  return (
    <div>
      <button>Go back without booking</button>
      <Booking bookingConfirmed={false} />

      {/* IF NOT LOGGED IN: Sign up form */}
      <div>
        <h1>Sign up to Noble Stay to continue to payment</h1>
        <RegisterForm />
      </div>

      {/* IF LOGGED IN: Select payment method */}
      <div>
        <h2>Select payment method</h2>
        {/* <p>Disclaimer: you will not be charged</p>  */}
        <PaymentOptions />
        <button>Book</button>
      </div>

    </div>
  )
}
export default PlaceBooking