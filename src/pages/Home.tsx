import { useState } from "react"
import CastleCardSmall from "../components/CastleCardSmall"
import FilterDropdown from "../components/FilterDropdown"
import { useNavigate, useSearchParams } from "react-router"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AddGuestsCounter from "@/components/AddGuestsCounter"
import { useCastleListing } from "@/contexts/CastleListingContext"
import useSelectOptions from "@/hooks/useFilter"
import DateCalendar from "@/components/DateCalendar"
import { format } from "date-fns"

const Home = () => {
  const { listings, selectedGuests, selectedDates, filters } = useCastleListing()
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()

  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  
  const [selectedFilters, setSelectedFilters] = useState(filters)
  const [locationInput, setLocationInput] = useState<string>('')

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(filterName, filterOption, filters)
    setSelectedFilters(updateSelectedFilters)
  }

  const dateModalHandler = () => {
    setIsDateModalOpen(isDateModalOpen => !isDateModalOpen)

    setIsGuestsModalOpen(false)
    setIsFilterModalOpen(false)
  }

  const guestsModalHandler = () => {
    setIsGuestsModalOpen(isGuestsModalOpen => !isGuestsModalOpen)

    setIsDateModalOpen(false)
    setIsFilterModalOpen(false)
  }

  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)

    setIsDateModalOpen(false)
    setIsGuestsModalOpen(false)
  }

  const handleSearch = () => {

    // Location params
    if(locationInput.trim() !== ''){
      searchParams.append('location', locationInput )
    }

    // Dates params
    if(selectedDates && selectedDates.from && selectedDates.to) {
      searchParams.append('from', format(selectedDates.from, 'yyyy-MM-dd'))
      searchParams.append('to', format(selectedDates.to, 'yyyy-MM-dd'))
    }

    // Guests params
    selectedGuests.map(guest => {
      guest.number > 0 &&
        searchParams.append(guest.category, guest.number.toString())
    })

    // Filter params
     selectedFilters.map(filter => {
      filter.selectedOptions.length > 0 &&
      filter.selectedOptions.forEach(option =>  
        searchParams.append(filter.name, option)
      )
    })
    
    // Insert searchparams and navigate to /search/ 
    navigate(`/search/?${searchParams}`)
    console.log(searchParams)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocationInput(value)
    console.log(locationInput)
  }

  return (
    <div>
      <div>
        {/* Search castles */}
        <div>
          <input type="text" placeholder="Search location" onChange={handleChange} value={locationInput}/>
          <input type="text" placeholder={selectedDates == undefined ? "Select date" : `${selectedDates.from?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${selectedDates.to?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`}  onClick={dateModalHandler}/>
          <input type="text" placeholder="Select guests" onClick={guestsModalHandler}/>
          <input type="text" placeholder="Filter" onClick={filterModalHandler}/>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {
        isDateModalOpen &&
        <div>
          <p onClick={dateModalHandler}>X</p>
          <DateCalendar />
        </div>
      }

      {
        isFilterModalOpen &&
        <div>
          <p onClick={filterModalHandler}>X</p>
          {selectedFilters.map(filter=> 
            <FilterDropdown name={filter.name} options={filter.options} onHandleSelectOptions={handleSelectOptions}/>
          )}
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