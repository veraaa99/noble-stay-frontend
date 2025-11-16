import axios from "@/axios_api/axios"
import { useEffect, useState } from "react"

type BookingProps = {
  booking: Booking
}

const Booking = ({ booking }: BookingProps) => {

  const [castle, setCastle] = useState<CastleListing | undefined>()

  useEffect(() => {
      const getListing = async() => {
        try {
          const res = await axios.get(`api/listings/${booking.castle._id}`)
          
          if(res.status !== 200) return
  
          setCastle(res.data)
  
          return
    
        } catch(error: any) {
          console.log(error.message)
          return
        }
      }
      getListing()
    }, [])

  return (
    <div>
      { castle && 
      <>
      
      <div>
          <div>
            <h1>Booking summary</h1>
            <div>
              <img src={castle.images[0]} alt="" />
            </div>
          </div>

        <div>
          <h2>{castle.title}</h2>
          <p>{castle.location}</p>
          <p>{castle.rules}</p>
        </div>
      </div>

      <div>
        <hr />
        <div>
          <h3>Date:</h3>
          <div>
            <p>{new Date(booking.bookedDates[0].toString()).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            <p>→</p>
            <p>{new Date(booking.bookedDates[booking.bookedDates.length-1]).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3>Room:</h3>
          { booking.bookedRooms.map(r => 
            <p>{r.title}</p>
          )}
        </div>
        <hr />
        <div>
          <h3>Guests:</h3>
          { booking.bookedGuests.map(g => 
          <p>{g.number} {g.category}</p>
          )}
        </div>
            <hr />
            <div>
              <h3>Booking ID:</h3>
              <p>{booking._id}</p>
            </div>
        <hr />
        <div>
          <h3>Total:</h3>
          <p>{booking.totalPrice}</p>
        </div>
      </div>
      
      </>
}
    </div>
  )
}
export default Booking