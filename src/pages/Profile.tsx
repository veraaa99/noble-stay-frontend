import Booking from "../components/Booking"
import CreatedListing from "../components/CreatedListing"
import ListingForm from "../components/ListingForm"
import { dummyBookings } from "../data/bookings"
import { dummyCastleListings } from "../data/castleListings"

const Profile = () => {
  // TODO: Use localstorage to save user who's currently logged in
  // TODO: Make a mybookings page? ask if it's ok
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
          <Booking booking={dummyBookings[0]}bookingConfirmed={true} />
          <Booking booking={dummyBookings[0]}bookingConfirmed={true} />
          <Booking booking={dummyBookings[0]}bookingConfirmed={true} />
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          <CreatedListing castle={dummyCastleListings[0]} />
        </div>

        {/* Create new castle listing */}
        <div>
          <h2>Create new castle listing</h2>
          <ListingForm />
        </div>
      </div>
      
    </div>
  )
}
export default Profile