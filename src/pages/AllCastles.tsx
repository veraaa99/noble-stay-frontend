import CastleCardBig from "../components/CastleCardBig"

const AllCastles = () => {
  return (
    <div>
      <div>
        <div>
          <h1>All castles</h1>
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
        <CastleCardBig />
        <CastleCardBig />
        <CastleCardBig />
      </div>
    </div>
  )
}
export default AllCastles