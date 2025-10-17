import { useParams } from "react-router"
import CastleCardBig from "../components/CastleCardBig"
import { dummyCastleListings } from "../data/castleListings"
import { useState } from "react"
import FilterDropdown from "../components/FilterDropdown"

const SearchResults = () => {
  // Använd usesearchparams?
  const { filter } = useParams()

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
  }

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
          <button onClick={filterModalHandler}>Filter</button>
        </div>
      </div>

      {
        isFilterModalOpen &&
        <div>
          <p onClick={filterModalHandler}>X</p>
          <FilterDropdown />
          <FilterDropdown />
          <FilterDropdown />
          <button onClick={filterModalHandler}>Apply</button>
        </div>
      }

      {/* Search results */}
      <div>
        {/* Castle card/s */}
        <CastleCardBig castle={dummyCastleListings[0]}/>
      </div>

    </div>
  )
}
export default SearchResults