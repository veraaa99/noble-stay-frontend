import Calendar from "../components/Calendar"
import AddGuestsCounter from "../components/AddGuestsCounter"
import RoomCard from "../components/RoomCard"
import { dummyRooms } from "../data/rooms"

const CastleDetails = () => {
  return (
    <div>
      <button>Go back to listings</button>
      {/* Full castle details */}
      <div>
        {/* Castle image */}
        <div>
          <img src="" alt="" />
        </div>
        {/* Castle information */}
        <div>
          <div>
            <div>
              <h1>DummyTitle</h1>
              <p>DummyEventAvaliable</p>
            </div>
            <button>Share</button>
          </div>

          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac turpis tristique, dictum massa tempus, pellentesque arcu. Pellentesque arcu... </p>
            <button>Expand</button>
            <div>
              <p>Pets welcome</p>
              <p>Gym nearby</p>
              <p>Breakfast included</p>
            </div>
          </div>

          <div>
            <div>
              <p>House rules</p>
              <p>DummyRules</p>
            </div>
            <div>
              <p>Safety and property</p>
              <p>DummyRules</p>
            </div>
            <div>
              <p>Cancellation Policy</p>
              <p>DummyRules</p>
            </div>
            <a href="">Full details</a>
          </div>
        </div>

        <hr />

        {/* Castle owner details */}
        <div>
          <div>
            <h2>Meet the castle owner</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac turpis tristique. </p>
          </div>
          <div>
            <img src="" alt="" />
            <p>DummyStars</p>
            <a href="">Contact host</a>
          </div>
        </div>

        <hr />

        {/* Location details */}
        <div>
          <h2>Castle location</h2>
          <img src="" alt="" />
        </div>

        <hr />

        {/* Select dates */}
        <div>
          <h2>Select dates</h2>
          <Calendar />
        </div>

        {/* Select guests */}
        <div>
          <h2>Select how many guests</h2>
          <AddGuestsCounter />
        </div>

        {/* Select Room */}
        <div>
          <h2>Select a room</h2>
          <RoomCard room={dummyRooms[0]}/>
          <RoomCard room={dummyRooms[1]}/>
          <RoomCard room={dummyRooms[2]}/>
        </div>

        {/* Total price and reserve */}
        <div>
          <div>
            <p>Total:</p>
            <p>DummyPrice</p>
          </div>
          <div>
            <p>You will not be charged yet</p>
            <button>Reserve</button>
          </div>
        </div>

      </div>
    </div>
  )
}
export default CastleDetails