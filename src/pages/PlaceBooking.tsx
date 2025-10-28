import { useNavigate, useSearchParams } from "react-router"
import PaymentOptions from "../components/PaymentOptions"
import RegisterForm from "../components/RegisterForm"
import { useBooking } from "@/contexts/BookingContext"
import { useCastleListing } from "@/contexts/CastleListingContext"
import { useUser } from "@/contexts/UserContext"
import { useState } from "react"
import LoginForm from "@/components/LoginForm"

const PlaceBooking = () => {

  const [searchParams] = useSearchParams()
  const { bookings, actions: bookingActions } = useBooking()
  const { selectedGuests, actions: castleListingActions } = useCastleListing()
  const { currentUser } = useUser()  

  const navigate = useNavigate()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  
  const castleId = searchParams.get('castleId')

  if(!castleId) {
    console.log('404: Not found')
    return
  }

  const newAllGuests: Guest[] = [...selectedGuests]
  const totalAmountOfGuests: number[] = newAllGuests.map(g => g.number)
  
  let sum = 0
  let i = 0
  for (i = 0; i < totalAmountOfGuests.length; i++) {
    sum += totalAmountOfGuests[i];
  }
  
  const castle: CastleListing | undefined  = castleListingActions.getListingByID(parseInt(castleId))

  const handleBookingSubmit = ()  => {

    const newBookingId = bookings.length > 0 ? Math.max(...bookings.map(b => b.bookingId)) + 1 : 1

    if(!castle) {
      console.log('Error: No castle listing found, booking could not be completed')
      return
    } else if (currentUser == null) {
      console.log('Error: You must be logged in to place a booking')
      return
    }

    const newBooking: Booking = {
      bookingId: newBookingId,
      castle: castle,

      bookedUser: currentUser,
      bookedDates: castle.dates,
      bookedRooms: castle.rooms,
      bookedGuests: selectedGuests,
      bookedEvents: castle.events,
      
      totalPrice: sum * castle.rooms[0].price
    }

    bookingActions.createBooking(newBooking)
    console.log(newBooking)
    navigate(`/confirmed?bookingId=${newBookingId}`)
  }

   const loginModalHandler = () => {
    setIsLoginModalOpen(isLoginModalOpen => !isLoginModalOpen)
  }

  return (
    <div>
      { castle && 
        <div>
          <button onClick={() => navigate('/')}>Go back without booking</button>

          <div>
            {/* Castle information summary */}
            <div>
                <div>
                  <h1>Booking summary</h1>
                  {/* Castle image */}
                  <div>
                    <img src={castle.images[0]} alt="" />
                  </div>
                </div>

              {/* Castle information */}
              <div>
                <h2>{castle.title}</h2>
                <p>{castle.location}</p>
                <p>{castle.rules}</p>
              </div>
            </div>

            {/* Booking details */}
            <div>
              <hr />
              <div>
                <h3>Date:</h3>
                <div>
                  {/* TODO: Add selected dates */}
                  <p>{castle.dates[0]}</p>
                  <p>→</p>
                  <p>{castle.dates[2]}</p>
                </div>
              </div>
              <hr />
              <div>
                <h3>Room/s:</h3>
                <p>{castle.rooms[0].title}</p>
              </div>
              <hr />
              <div>
                <h3>Guests:</h3>
                {selectedGuests.map(g => 
                  <>
                    <p>{g.number}</p>
                    <p>{g.category}</p>
                  </>
                )}
              </div>
              <hr />
              <div>
                <h3>Total:</h3>
                <p>{sum * castle.rooms[0].price}</p>
              </div>
            </div>
          </div>
          {
            currentUser
            ?
            // IF LOGGED IN: Select payment method
            <div>
              <h2>Select payment method</h2>
              <p>Disclaimer: you will not be charged</p> 
              <PaymentOptions />
              <button onClick={handleBookingSubmit}>Book</button>
            </div>
            :
            // IF NOT LOGGED IN: Sign up form
            <div>
              <h1>Sign up to Noble Stay to continue to payment</h1>
              <RegisterForm />
              <p>Already have an account?</p> <p onClick={loginModalHandler}>LOG IN</p>
            </div>
          }
          {
            isLoginModalOpen && 
            <div>
              <p onClick={loginModalHandler}>X</p>
              <LoginForm setIsLoginModalOpen={setIsLoginModalOpen}/>
            </div>
          }
        </div>
      }
    </div>
  )
}
export default PlaceBooking