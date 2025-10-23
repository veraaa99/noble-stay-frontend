import { useEffect, useState } from "react"
import CastleCardSmall from "../components/CastleCardSmall"
import FilterDropdown from "../components/FilterDropdown"
import { dummyCastleListings } from "../data/castleListings"
import { useNavigate } from "react-router"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AddGuestsCounter from "@/components/AddGuestsCounter"
import { dummyFilters } from "@/data/filters"

const Home = () => {
 
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  const [selectedFilters, setSelectedFilters] = useState(dummyFilters)

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const newSelectedFilters = [...selectedFilters]
    const filterToUpdate = newSelectedFilters.find(f => f.name == filterName)
    const filterToUpdateIndex = newSelectedFilters.findIndex(f => f.name == filterName)

    if (filterToUpdate) {
      const optionAlreadySelected = filterToUpdate.selectedOptions.find(o => o == filterOption)
      
      if(optionAlreadySelected) {
        const updatedSelectedOptions = filterToUpdate.selectedOptions.filter(o => o !== filterOption)

        const updatedFilter: Filter = {
          ...filterToUpdate,
          selectedOptions: updatedSelectedOptions
        }

        newSelectedFilters[filterToUpdateIndex] = updatedFilter
      } else {
        filterToUpdate.selectedOptions.push(filterOption)

        const updatedFilter: Filter = {
          ...filterToUpdate,
          selectedOptions: filterToUpdate.selectedOptions
        }
        
        newSelectedFilters[filterToUpdateIndex] = updatedFilter
      }

      setSelectedFilters(newSelectedFilters)
    }

  }

  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
  }

  const guestsModalHandler = () => {
    setIsGuestsModalOpen(isGuestsModalOpen => !isGuestsModalOpen)
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
          <input type="text" placeholder="Select guests" onClick={guestsModalHandler}/>
          <input type="text" placeholder="Filter" onClick={filterModalHandler}/>
          <button onClick={() => navigate('/search/1')}>Search</button>
        </div>
      </div>

      {
        isFilterModalOpen &&
        <div>
          <p onClick={filterModalHandler}>X</p>
          <FilterDropdown name={dummyFilters[0].name} options={dummyFilters[0].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={dummyFilters[1].name} options={dummyFilters[1].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={dummyFilters[2].name} options={dummyFilters[2].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={dummyFilters[3].name} options={dummyFilters[3].options} onHandleSelectOptions={handleSelectOptions}/>
          <button onClick={filterModalHandler}>Apply</button>
        </div>
      }

      {
        isGuestsModalOpen &&
        <div>
          <p onClick={guestsModalHandler}>X</p>
          <AddGuestsCounter />
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
          <Carousel>
            <CarouselContent>
              {
                dummyCastleListings.map(c => (
                  <CarouselItem>
                    <CastleCardSmall castle={c}/>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
          </Carousel>
        </div>

        {/* Sweden castles carousel */}
        <h2>Sweden</h2>
        <div>
          <Carousel>
            <CarouselContent>
              {
                dummyCastleListings.map(c => (
                  <CarouselItem>
                    <CastleCardSmall castle={c}/>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
          </Carousel>
        </div>
      </div>

    </div>
  )
}
export default Home