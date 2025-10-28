import { useNavigate, useSearchParams } from "react-router"
import CastleCardBig from "../components/CastleCardBig"
import { useState } from "react"
import FilterDropdown from "../components/FilterDropdown"
import { useCastleListing } from "@/contexts/CastleListingContext"
import useSelectOptions from "@/hooks/useFilter"

const SearchResults = () => {
  // Använd usesearchparams?
  //  createSearchParams?
  // querystring.stringify?

  const [ searchParams ] = useSearchParams()

  const params = [];

  for(let entry of searchParams.entries()) {
    params.push(entry);
  }

  console.log(params)
  
  const { listings, filters, filterCheckboxes } = useCastleListing()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(filters)
  const navigate = useNavigate()
  
  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(filterName, filterOption, filters)
    setSelectedFilters(updateSelectedFilters)
  }
  
  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
    navigate('/search/?guests=3&rooms=1&amneties=pets')
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