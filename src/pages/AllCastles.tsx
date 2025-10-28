import { useState } from "react"
import CastleCardBig from "../components/CastleCardBig"
import FilterDropdown from "../components/FilterDropdown"
import useSelectOptions from "@/hooks/useFilter"
import { useNavigate } from "react-router"
import { useCastleListing } from "@/contexts/CastleListingContext"

const AllCastles = () => {

  const { listings, filters } = useCastleListing()
  const navigate = useNavigate()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(filters)

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
          {selectedFilters.map(filter=> 
            <FilterDropdown name={filter.name} options={filter.options} onHandleSelectOptions={handleSelectOptions}/>
          )}
          <button onClick={filterModalHandler}>Apply</button>
        </div>
      }

      {/* Search results */}
      <div>
        {/* Castle card/s */}
        { listings.map (c => (
          <CastleCardBig castle={c} />
          ))
        }
      </div>
    </div>
  )
}
export default AllCastles