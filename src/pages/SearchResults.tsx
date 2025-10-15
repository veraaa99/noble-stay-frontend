import CastleCardBig from "../components/CastleCardBig"

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
        <CastleCardBig />
        <CastleCardBig />
        <CastleCardBig />
      </div>

    </div>
  )
}
export default SearchResults