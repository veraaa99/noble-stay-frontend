import { useNavigate, useSearchParams } from "react-router"
import CastleCardBig from "../components/CastleCardBig"
import { useState } from "react"
import FilterDropdown from "../components/FilterDropdown"
import { useCastleListing } from "@/contexts/CastleListingContext"
import useSelectOptions from "@/hooks/useFilter"
import DateCalendar from "@/components/DateCalendar"

const SearchResults = () => {
  // Använd usesearchparams?
  //  createSearchParams?
  // querystring.stringify?
  const [ searchParams ] = useSearchParams()
  const urlParams = new URLSearchParams(searchParams)
  const params = [];

  for(let entry of searchParams.entries()) {
    params.push(entry);
  }

  console.log(params)
  console.log(urlParams.get('location'))
  
  const { listings, selectedDates, filters } = useCastleListing()
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(filters)
  const navigate = useNavigate()
  
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
      <div>
        <div>
          <h1>Showing results for:</h1>
          <input type="text" placeholder="Search location" />
          <input type="text" placeholder={selectedDates == undefined ? "Select date" : `${selectedDates.from?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${selectedDates.to?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`}  onClick={dateModalHandler}/>
        </div>
        <div>
          <p>dummyNumber</p>
          <button onClick={filterModalHandler}>Filter</button>
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