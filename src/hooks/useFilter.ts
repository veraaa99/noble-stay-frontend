import { useCastleListing } from "@/contexts/CastleListingContext"

const useSelectOptions = (filterName: string, filterOption: string, selectedFilters: Filter[]): Filter[] => {

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
  }

  // Localstorage - set selectedfilters?
  return newSelectedFilters

}

export default useSelectOptions