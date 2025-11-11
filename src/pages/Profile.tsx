import { useUser } from "@/contexts/UserContext"
import Booking from "../components/Booking"
import CreatedListing from "../components/CreatedListing"
import ListingForm from "../components/ListingForm"
import { useEffect, useState } from "react"
import { useBooking } from "@/contexts/BookingContext"
import { useCastleListing } from "@/contexts/CastleListingContext"

const Profile = () => {
  const { currentUser } = useUser()
  const { actions: bookingActions } = useBooking()
  const { actions: castleListingActions } = useCastleListing()
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [userListings, setUserListings] = useState<CastleListing[]>([])

  useEffect(() => {
    if(currentUser) {
      const currentUserBookings: Booking[] | undefined = bookingActions.getBookingsByUser(currentUser._id)
      const currentUserListings: CastleListing[] | undefined = castleListingActions.getListingsByUser(currentUser._id)

      if(currentUserBookings) {
        setUserBookings(currentUserBookings)
      }
      if (currentUserListings) {
        setUserListings(currentUserListings)
      }
    }
  }, [])
  
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
            <p>{currentUser?.email}</p>
            <hr />
            <h3>Mobile</h3>
            <p>{currentUser?.phone}</p>
          </div>
        </div>

        {/* My bookings */}
        <div>
          <h2>My bookings</h2>
          {
            userBookings.map(b => (
              <Booking booking={b} />
            ))
          }
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          { userListings.map(c => (
            <CreatedListing castle={c} />
          )) }
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