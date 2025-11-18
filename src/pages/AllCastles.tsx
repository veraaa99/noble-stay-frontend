import { useEffect, useState } from "react"
import CastleCardBig from "../components/CastleCardBig"
import FilterDropdown from "../components/FilterDropdown"
import useSelectOptions from "@/hooks/useFilter"
import { useNavigate, useSearchParams } from "react-router"
import { useCastleListing } from "@/contexts/CastleListingContext"
import DateCalendar from "@/components/DateCalendar"

import locationIcon from '../assets/Location_On.svg'
import calendarIcon from '../assets/Calendar_Month.svg'
import { format } from "date-fns"

const AllCastles = () => {

  const { listings, selectedGuests, selectedDates, filters, actions } = useCastleListing()
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()

  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const [locationInput, setLocationInput] = useState<string>('')

  useEffect(() => {
    actions.resetFilters()
  }, [])

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const updateSelectedFilters = useSelectOptions(filterName, filterOption, filters)
    actions.setSelectedFilters(updateSelectedFilters)
  }

  const dateModalHandler = () => {
    setIsDateModalOpen(isDateModalOpen => !isDateModalOpen)
    setIsFilterModalOpen(false)
  }
  
  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen) 
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
       filters.map(filter => {
        // filter.selectedOptions.length > 0 &&
        filter.selectedOptions.forEach(option =>  
          searchParams.append(filter.name, option)
        )
      })
      
      // Insert searchparams and navigate to /search/ 
      if(searchParams.toString() == '') {
        navigate(`/search/`)
      } else {
        navigate(`/search/?${searchParams}`)
      }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocationInput(value)
  }

  return (
    <div>
      <div className="flex flex-col px-4 mt-5 mb-5 gap-8">
        <div className="flex flex-col gap-5">
          <h1>All castles</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <img src={locationIcon} alt="" />
              <input type="text" placeholder="All Locations" onChange={handleChange} value={locationInput}/>
            </div>
            <div className="flex gap-1">
              <img src={calendarIcon} alt="" />
              <input type="text" placeholder={selectedDates == undefined ? "No date specified" : `${selectedDates.from?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${selectedDates.to?.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`}  onClick={dateModalHandler}/>
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
          {filters.map(filter=> 
            <FilterDropdown name={filter.name} options={filter.options} onHandleSelectOptions={handleSelectOptions}/>
          )}
          <button onClick={handleSearch}>Apply</button>
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