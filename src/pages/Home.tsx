import { useState } from "react"
import CastleCardSmall from "../components/CastleCardSmall"
import FilterDropdown from "../components/FilterDropdown"
import { useNavigate } from "react-router"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AddGuestsCounter from "@/components/AddGuestsCounter"
import { useCastleListing } from "@/contexts/CastleListingContext"
import useSelectOptions from "@/hooks/useFilter"

const Home = () => {
  const { listings, filters } = useCastleListing()
  const navigate = useNavigate()

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(filters)

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(filterName, filterOption, filters)
    setSelectedFilters(updateSelectedFilters)
  }

  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
  }

  const guestsModalHandler = () => {
    setIsGuestsModalOpen(isGuestsModalOpen => !isGuestsModalOpen)
  }

  return (
    <div>
      <div>
        {/* Search castles */}
        <div>
          <input type="text" placeholder="Search location" />
          <input type="text" placeholder="Select date"/>
          <input type="text" placeholder="Select guests" onClick={guestsModalHandler}/>
          <input type="text" placeholder="Filter" onClick={filterModalHandler}/>
          <button onClick={() => navigate('/search/?guests=3')}>Search</button>
        </div>
      </div>

      {
        isFilterModalOpen &&
        <div>
          <p onClick={filterModalHandler}>X</p>
          <FilterDropdown name={selectedFilters[0].name} options={selectedFilters[0].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={selectedFilters[1].name} options={selectedFilters[1].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={selectedFilters[2].name} options={selectedFilters[2].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={selectedFilters[3].name} options={selectedFilters[3].options} onHandleSelectOptions={handleSelectOptions}/>
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
                listings.map(c => (
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
                listings.map(c => (
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