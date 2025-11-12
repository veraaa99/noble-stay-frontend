import { useUser } from "@/contexts/UserContext"
import Booking from "../components/Booking"
import CreatedListing from "../components/CreatedListing"
import ListingForm from "../components/ListingForm"
import { useEffect, useState } from "react"
import { useBooking } from "@/contexts/BookingContext"
import { useCastleListing } from "@/contexts/CastleListingContext"
import axios from "@/axios_api/axios"

const Profile = () => {
  const { currentUser, token } = useUser()
  const { actions: bookingActions } = useBooking()
  const { listings, actions: castleListingActions } = useCastleListing()

  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [userListings, setUserListings] = useState<CastleListing[]>([])
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    getUser()
    getUserBookings()
  }, [])

  const getUserBookings = async() => {
    try {
      const res = await axios.get('/api/bookings', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
  
      if(res.status !== 200) return
  
      setUserBookings(res.data)
      return
      
    } catch (err: any) {
      console.log(err.response?.data?.message || 'Something went wrong')
      return
    }
  }

  const getUser = async() => {
    try {
      const res = await axios.get(`/api/users/${currentUser}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
  
      if(res.status !== 200) return
  
      setUser(res.data)
      return
      
    } catch (err: any) {
      console.log(err.response?.data?.message || 'Something went wrong')
      return
    }
  }
  
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
            <p>{user?.email}</p>
            <hr />
            <h3>Mobile</h3>
            <p>{user?.phone}</p>
          </div>
        </div>

        {/* My bookings */}
        <div>
          <h2>My bookings</h2>
          {
            // userBookings.length > 0 && 
            userBookings.map(b => (
              <Booking booking={b} />
            ))
          }
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          { listings.map(c => (
            c.castleOwner._id == user?._id) &&
              <CreatedListing castle={c} />
          )}
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