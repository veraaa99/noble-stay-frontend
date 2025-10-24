import { useState } from "react"
import CastleCardBig from "../components/CastleCardBig"
import { dummyCastleListings } from "../data/castleListings"
import FilterDropdown from "../components/FilterDropdown"
import { dummyFilters } from "@/data/filters"

const AllCastles = () => {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(dummyFilters)

  const handleSelectOptions = (filterName: string, filterOption: string) => {
    const newSelectedFilters: Filter[] = [...selectedFilters]
    const filterToUpdate: Filter | undefined = newSelectedFilters.find(f => f.name == filterName)
    const filterToUpdateIndex: number | undefined = newSelectedFilters.findIndex(f => f.name == filterName)

    if (filterToUpdate) {
      const optionAlreadySelected: string | undefined = filterToUpdate.selectedOptions.find(o => o == filterOption)
      
      if(optionAlreadySelected) {
        const updatedSelectedOptions: string[] | undefined = filterToUpdate.selectedOptions.filter(o => o !== filterOption)

        const updatedFilter: Filter = {
          ...filterToUpdate,
          selectedOptions: updatedSelectedOptions
        }

        newSelectedFilters[filterToUpdateIndex] = updatedFilter
      } else {
        filterToUpdate.selectedOptions.push(filterOption)

        const updatedFilter: Filter = {
          ...filterToUpdate,
          selectedOptions: filterToUpdate.selectedOptions
        }
        
        newSelectedFilters[filterToUpdateIndex] = updatedFilter
      }

      setSelectedFilters(newSelectedFilters)
    }

  }
  
  const filterModalHandler = () => {
    setIsFilterModalOpen(isFilterModalOpen => !isFilterModalOpen)
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
          <FilterDropdown name={dummyFilters[0].name} options={dummyFilters[0].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={dummyFilters[1].name} options={dummyFilters[1].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={dummyFilters[2].name} options={dummyFilters[2].options} onHandleSelectOptions={handleSelectOptions}/>
          <FilterDropdown name={dummyFilters[3].name} options={dummyFilters[3].options} onHandleSelectOptions={handleSelectOptions}/>
          <button onClick={filterModalHandler}>Apply</button>
        </div>
      }

      {/* Search results */}
      <div>
        {/* Castle card/s */}
        { dummyCastleListings.map (c => (
          <CastleCardBig castle={c} />
          ))
        }
      </div>
    </div>
  )
}
export default AllCastles