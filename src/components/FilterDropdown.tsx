import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useState } from 'react'
import { Button } from './ui/button'

type DropdownProps = {
  name: string,
  options: string[],
  onHandleSelectOptions: (name: string, option: string) => void
}

const FilterDropdown = ({ name, options, onHandleSelectOptions }: DropdownProps ) => {

  const [checked, setChecked] = useState<string[]>([]);
  //TODO: If size or rooms, only one checkbox/radio button?

  // https://stackoverflow.com/questions/60408612/how-to-select-one-checkbox-from-a-mapped-multiple-checkboxes-react-js
  const handleChange = (option: string) => () => {
    onHandleSelectOptions(name, option)
    setChecked(prev => {
      if (prev.includes(option)) {
        return prev.filter(x => x !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          { options.map(option => 
            <DropdownMenuCheckboxItem
              key={option}
              checked={checked.includes(option)}
              onCheckedChange={handleChange(option)}
              onSelect={(e) => {e.preventDefault()}}
            >
              {option}
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default FilterDropdown