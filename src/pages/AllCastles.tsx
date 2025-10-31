import { useEffect, useState } from "react"
import CastleCardBig from "../components/CastleCardBig"
import FilterDropdown from "../components/FilterDropdown"
import useSelectOptions from "@/hooks/useFilter"
import { useNavigate } from "react-router"
import { useCastleListing } from "@/contexts/CastleListingContext"
import DateCalendar from "@/components/DateCalendar"

const AllCastles = () => {

  const { listings, filters } = useCastleListing()
  const navigate = useNavigate()
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>(filters)

  useEffect(() => {
    const resetSelectedfilters = selectedFilters.map(filter => { 
      return {...filter, selectedOptions: []}
    });
    
    setSelectedFilters(resetSelectedfilters)
  }, [])

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
  }

  return (
    <div>
      <div>
        <div>
          <h1>All castles</h1>
          <input type="text" placeholder="All locations" />
          <input type="text" placeholder="No date specified"/>
        </div>
        <div>
          <p>3 found</p>
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
          <button onClick={() => navigate('/search/?guests=3&rooms=1&amneties=pets')}>Apply</button>
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