import { useNavigate } from "react-router"
import Booking from "../components/Booking"
import PaymentOptions from "../components/PaymentOptions"
import RegisterForm from "../components/RegisterForm"
import { dummyBookings } from "../data/bookings"

const PlaceBooking = () => {

  const navigate = useNavigate()

  return (
    <div>
      <button>Go back without booking</button>
      <Booking booking={dummyBookings[0]} bookingConfirmed={false} />

      {/* IF NOT LOGGED IN: Sign up form */}
      <div>
        <h1>Sign up to Noble Stay to continue to payment</h1>
        <RegisterForm />
        <p>Already have an account?</p> <p>LOG IN</p>
      </div>

      {/* IF LOGGED IN: Select payment method */}
      <div>
        <h2>Select payment method</h2>
        {/* <p>Disclaimer: you will not be charged</p>  */}
        <PaymentOptions />
        <button onClick={() => navigate('/confirmed')}>Book</button>
      </div>

    </div>
  )
}
export default PlaceBooking