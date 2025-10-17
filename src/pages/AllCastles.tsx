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
          <FilterDropdown name={'Size'} options={['50m²', '20m²', '100m²']}/>
          <FilterDropdown name={'Number of rooms'} options={['1', '2', '3', '4', '5']}/>
          <FilterDropdown name={'Events'} options={['Ghost hunting', 'Dance party', 'Photoshoot', 'Guided tour']}/>
          <FilterDropdown name={'Amneties'} options={['Pets allowed', 'Breakfast included', 'Lunch included', 'Gym nearby']}/>
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