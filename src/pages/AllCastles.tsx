import { useEffect, useState } from "react"
import CastleCardBig from "../components/CastleCardBig"
import FilterDropdown from "../components/FilterDropdown"
import useSelectOptions from "@/hooks/useFilter"
import { useNavigate } from "react-router"
import { useCastleListing } from "@/contexts/CastleListingContext"
import DateCalendar from "@/components/DateCalendar"

import locationIcon from '../assets/Location_On.svg'
import calendarIcon from '../assets/Calendar_Month.svg'

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
      <div className="flex flex-col px-4 mt-5 mb-5 gap-8">
        <div className="flex flex-col gap-5">
          <h1>All castles</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <img src={locationIcon} alt="" />
              <input type="text" placeholder="All Locations"/>
            </div>
            <div className="flex gap-1">
              <img src={calendarIcon} alt="" />
              <input type="text" placeholder="No date specified" onClick={dateModalHandler}/>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p><strong>{listings.length}</strong> found</p>
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