import { DayPicker } from "react-day-picker"

const Details = () => {
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
          <div>
            <DayPicker />
          </div>
        </div>

        {/* Select guests */}
        <div>
          <h2>Select how many guests</h2>
          <div>

            <div>
              <div>
                <p>Adults</p>
                <p>Ages 13 or above</p>
              </div>
              <div>
                <button>-</button>
                <p>DummyNumber</p>
                <button>+</button>
              </div>
            </div>
            <div>
              <div>
                <p>Children</p>
                <p>Under 13</p>
              </div>
              <div>
                <button>-</button>
                <p>DummyNumber</p>
                <button>+</button>
              </div>
            </div>
            <div>
              <div>
                <p>Pets</p>
              </div>
              <div>
                <button>-</button>
                <p>DummyNumber</p>
                <button>+</button>
              </div>
            </div>
      
          </div>
        </div>

        {/* Select Room */}
        <div>

          <h2>Select a room</h2>
          <div>
            <div>
              <h3>DummyRoom</h3>
              <p>DummyRoomCaption</p>
              <ul>
                <li>DummyDescription</li>
                <li>DummyDescription</li>
                <li>DummyDescription</li>
              </ul>
            </div>
            <hr />
            <div>
              <p>DummyPrice</p>
              <div>
                <p>Select this room</p>
                <input type="radio" name="" id="" />
              </div>
            </div>
          </div>

          <div>
            <div>
              <h3>DummyRoom</h3>
              <p>DummyRoomCaption</p>
              <ul>
                <li>DummyDescription</li>
                <li>DummyDescription</li>
                <li>DummyDescription</li>
              </ul>
            </div>
            <hr />
            <div>
              <p>DummyPrice</p>
              <div>
                <p>Select this room</p>
                <input type="radio" name="" id="" />
              </div>
            </div>
          </div>

          <div>
            <div>
              <h3>DummyRoom</h3>
              <p>DummyRoomCaption</p>
              <ul>
                <li>DummyDescription</li>
                <li>DummyDescription</li>
                <li>DummyDescription</li>
              </ul>
            </div>
            <hr />
            <div>
              <p>DummyPrice</p>
              <div>
                <p>Select this room</p>
                <input type="radio" name="" id="" />
              </div>
            </div>
          </div>

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
export default Details