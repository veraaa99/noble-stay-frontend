import Booking from "../components/Booking"
import CastleListing from "../components/CastleListing"
import CastleListingForm from "../components/CastleListingForm"

const Profile = () => {
  return (
    <div>
      {/* Full account information */}
      <div>
        {/* Title */}
        <h1>Profile</h1>
        {/* Account details */}
        <div>
          <h2>Account details</h2>
          <div>
            <h3>Email</h3>
            <p>dummyEmail</p>
            <hr />
            <h3>Mobile</h3>
            <p>dummyMobile</p>
          </div>
        </div>

        {/* My bookings */}
        <div>
          <h2>My bookings</h2>
          <Booking bookingConfirmed={true} />
          <Booking bookingConfirmed={true} />
          <Booking bookingConfirmed={true} />
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          <CastleListing />
        </div>

        {/* Create new castle listing */}
        <div>
          <h2>Create new castle listing</h2>
          <CastleListingForm />
        </div>
      </div>
      
    </div>
  )
}
export default Profile