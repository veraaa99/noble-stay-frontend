import CastleCardBig from "../components/CastleCardBig"
import { dummyCastleListings } from "../data/castleListings"

const AllCastles = () => {
  return (
    <div>
      <div>
        <div>
          <h1>All castles</h1>
        </div>
        <div>
          <p>3 found</p>
          <button>Filter</button>
        </div>
      </div>

      {/* Search results */}
      <div>
        {/* Castle card/s */}
        <CastleCardBig castle={dummyCastleListings[0]} />
        <CastleCardBig castle={dummyCastleListings[0]} />
        <CastleCardBig castle={dummyCastleListings[0]} />
      </div>
    </div>
  )
}
export default AllCastles