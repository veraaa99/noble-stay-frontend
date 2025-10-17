import CastleCardBig from "../components/CastleCardBig"
import { dummyCastleListings } from "../data/castleListings"

const SearchResults = () => {
  // Använd usesearchparams?

  return (
    <div>
      {/* Search filters */}
      <div>
        <div>
          <h1>Showing results for:</h1>
          <p>DummyLocation</p>
          <p>DummyDate</p>
        </div>
        <div>
          <p>dummyNumber</p>
          <button>Filter</button>
        </div>
      </div>

      {/* Search results */}
      <div>
        {/* Castle card/s */}
        <CastleCardBig castle={dummyCastleListings[0]}/>
      </div>

    </div>
  )
}
export default SearchResults