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
        <CastleCardBig castle={dummyCastleListings[0]}/>
      </div>

    </div>
  )
}
export default SearchResults