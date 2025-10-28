import { useSearchParams } from "react-router"
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
  
  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(filterName, filterOption, filters)
    setSelectedFilters(updateSelectedFilters)
    console.log(selectedFilters)
  }
  
  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
  }
  
  console.log(filterCheckboxes)
    
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
          <FilterDropdown name={selectedFilters[0].name} options={selectedFilters[0].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={selectedFilters[1].name} options={selectedFilters[1].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={selectedFilters[2].name} options={selectedFilters[2].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={selectedFilters[3].name} options={selectedFilters[3].options} onHandleSelectOptions={handleSelectOptions}/>
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