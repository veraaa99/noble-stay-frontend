import { DayPicker } from "react-day-picker"

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
          <div>
            <div>
              <h3>dummyTitle</h3>
              <p>dummyLocation</p>
              <p>dummyDates</p>
              <p>dummyRoom</p>
              <p>dummyGuests</p>
              <p>dummyBookingID</p>
            </div>
            <hr />
            <div>
              <h3>dummyTitle</h3>
              <p>dummyLocation</p>
              <p>dummyDates</p>
              <p>dummyRoom</p>
              <p>dummyGuests</p>
              <p>dummyBookingID</p>
            </div>
          </div>
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          <div>
            <div>
              <div>
                <img src="" alt="" />
              </div>
              <h3>dummyTitle</h3>
              <p>dummyLocation</p>
              <p>dummyAvaliableDates</p>
              <p>dummyRoomsAvaliable</p>
              <p>dummyGuestsAvaliable</p>
              <p>dummyRules</p>
              <p>dummyAmenities</p>
            </div>  
          </div>
        </div>

        {/* Create new castle listing */}
        <div>
          <h2>Create new castle listing</h2>
          <form action="">

            <div>
              <h3>Name of castle</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>Location</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>Description</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>Set avaliable dates</h3>
              <DayPicker />
            </div>
            <div>
              <h3>Set maximum of guests per booking</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>What type of rooms do you offer?</h3>
              <input type="text" name="" id="" />
              <h3>How many of each room?</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>Price per night:</h3>
              <input type="text" name="" id="" />
              <h3>Price per room:</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>What amneties do you offer?</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>Set house rules and cancellation policy</h3>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h3>Set contact email to castle owner</h3>
              <input type="text" name="" id="" placeholder="dummyEmail"/>
            </div>
            <div>
              <h3>Upload images of your castle</h3>
              <input type="file" name="" id="" />
            </div>

            <button type="submit">Submit listing</button>
          </form>
        </div>
      </div>
      
    </div>
  )
}
export default Profile