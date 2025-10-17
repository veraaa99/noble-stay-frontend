import { useState } from "react"
import CastleCardBig from "../components/CastleCardBig"
import { dummyCastleListings } from "../data/castleListings"
import FilterDropdown from "../components/FilterDropdown"

const AllCastles = () => {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  
  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
  }

  return (
    <div>
      <div>
        <div>
          <h1>All castles</h1>
        </div>
        <div>
          <p>3 found</p>
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
        { dummyCastleListings.map (c => (
          <CastleCardBig castle={c} />
          ))
        }
      </div>
    </div>
  )
}
export default AllCastles