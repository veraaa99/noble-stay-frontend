import { useState } from "react"
import CastleCardSmall from "../components/CastleCardSmall"
import FilterDropdown from "../components/FilterDropdown"
import { dummyCastleListings } from "../data/castleListings"
import { useNavigate } from "react-router"

const Home = () => {
  // TODO: Add date picker for the select date field
  // TODO: Install tailwind and ShadCN
  // https://daypicker.dev/docs/selection-modes

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
  }

  // Make into a hook?
  const navigate = useNavigate()

  return (
    <div>
      <div>
        {/* Search castles */}
        <div>
          <input type="text" placeholder="Search location" />
          <input type="text" placeholder="Select date"/>
          <input type="text" placeholder="Select guests" />
          <input type="text" placeholder="Filter" onClick={filterModalHandler}/>
          <button onClick={() => navigate('/search/1')}>Search</button>
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

      <div>
        <h1>Check Into a Fairytale</h1>
        <p>Sleep in real castles, wake to real magic. Or why not join us for ghost hunting? With Nobal Stay, your storybook stay begins for real.</p>
      </div>

      <div>
        {/* Scandinavia castles carousel */}
        <h2>Scandinavia</h2>
        <div>
          {
            dummyCastleListings.map(c => (
              <CastleCardSmall castle={c}/>
            ))
          }
        </div>

        {/* Sweden castles carousel */}
        <h2>Sweden</h2>
        <div>
          {
            dummyCastleListings.map(c => (
              <CastleCardSmall castle={c}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}
export default Home