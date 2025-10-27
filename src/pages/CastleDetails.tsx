import Calendar from "../components/DateCalendar"
import AddGuestsCounter from "../components/AddGuestsCounter"
import RoomCard from "../components/RoomCard"
import { useNavigate, useParams } from "react-router"
import { useCastleListing } from "@/contexts/CastleListingContext"

const CastleDetails = () => {

  const params = useParams()
  const { actions } = useCastleListing()

  if(!params.castleId) {
    console.log('404: Not found')
    return
  }

  const navigate = useNavigate()

  const castle: CastleListing | undefined  = actions.getListingByID(parseInt(params.castleId))

  return (
    <div>
      <button>Go back to listings</button>
      {/* Full castle details */}
      { castle &&
        <div>
          {/* Castle image */}
          <div>
            <img src={castle.images[0]} alt="" />
          </div>
          {/* Castle information */}
          <div>
            <div>
              <div>
                <h1>{castle.title}</h1>
                <p>{castle.events}</p>
              </div>
              <button>Share</button>
            </div>

            <div>
              <p>{castle.description} </p>
              <button>Expand</button>
              <div>
                <ul>
                  {
                    castle.amneties?.map(a =>
                      <li>{a}</li>
                    )
                  }
                </ul>
              </div>
            </div>

            <div>
              <div>
                <ul>
                  {
                    castle.rules.map( r =>
                      <li>{r}</li>
                    )
                  }
                </ul>
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
            <h2>{castle.location}</h2>
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
            <AddGuestsCounter 
            castleListing={castle}/>
          </div>

          {/* Select Room */}
          <div>
            <h2>Select a room</h2>
            {
              castle.rooms.map (r => 
                <RoomCard room={r} />
              )
            }
          </div>

          {/* Total price and reserve */}
          <div>
            <div>
              <p>Total:</p>
              <p>DummyPrice</p>
            </div>
            <div>
              <p>You will not be charged yet</p>
              <button onClick={() => navigate(`/book/?castleId=${castle.id}`)}>Reserve</button>
            </div>
          </div>

        </div>
      }

    </div>
  )
}
export default CastleDetails