import { useNavigate, useSearchParams } from "react-router"
import CastleCardBig from "../components/CastleCardBig"
import { useState } from "react"
import FilterDropdown from "../components/FilterDropdown"
import { useCastleListing } from "@/contexts/CastleListingContext"
import useSelectOptions from "@/hooks/useFilter"
import DateCalendar from "@/components/DateCalendar"

import locationIcon from '../assets/Location_On.svg'
import calendarIcon from '../assets/Calendar_Month.svg'

const SearchResults = () => {
  // Använd usesearchparams?
  //  createSearchParams?
  // querystring.stringify?
  const [ searchParams ] = useSearchParams()
  const urlParams = new URLSearchParams(searchParams)  
  
  const { listings, selectedDates, filters } = useCastleListing()
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(filters)
  const navigate = useNavigate()
  
  // const size = urlParams.getAll('Size')
  // const roomsNumber = urlParams.getAll('Number of rooms')
  // const events = urlParams.getAll('Events')
  // const amneties = urlParams.getAll('Amneties')

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(filterName, filterOption, filters)
    setSelectedFilters(updateSelectedFilters)
  }

  const dateModalHandler = () => {
    setIsDateModalOpen(isDateModalOpen => !isDateModalOpen)
    setIsFilterModalOpen(false)
  }
  
  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
    // TODO: Replace filter url
    navigate('/search/?guests=3&rooms=1&amneties=pets')
  }
      
  return (
    <div>
      {/* Search filters */}
      <div className="flex flex-col px-4 mt-5 mb-5 gap-8">
        <div className="flex flex-col gap-5">
          <h1>Showing results for:</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <img src={locationIcon} alt="" />
              <input type="text" placeholder={urlParams.get('location') == null ? "Select location" : urlParams.get('location')?.toString()} />
            </div>
            <div className="flex gap-1">
              <img src={calendarIcon} alt="" />
              <input type="text" placeholder={selectedDates == undefined ? "Select date" : `${selectedDates.from?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${selectedDates.to?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`}  onClick={dateModalHandler}/>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <p><strong>1</strong> found</p>
          <button className="btn-secondary" onClick={filterModalHandler}>Filter</button>
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

      {/* Search results */}
      <div>
        {/* Castle card/s */}
        <CastleCardBig castle={listings[0]}/>
      </div>

    </div>
  )
}
export default SearchResults