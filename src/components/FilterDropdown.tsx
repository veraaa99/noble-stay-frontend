import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useCastleListing } from "@/contexts/CastleListingContext";

type DropdownProps = {
  name: string;
  options: FilterOption[];
  onHandleSelectOptions: (name: string, option: string) => void;
};

const FilterDropdown = ({
  name,
  options,
  onHandleSelectOptions,
}: DropdownProps) => {
  //TODO: If size or rooms, only one checkbox/radio button?
  const { filterCheckboxes, actions } = useCastleListing();

  // https://stackoverflow.com/questions/60408612/how-to-select-one-checkbox-from-a-mapped-multiple-checkboxes-react-js
  const handleChange = (option: string) => () => {
    onHandleSelectOptions(name, option);
    actions.updateFilterboxes(option);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{name}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.id}
              checked={filterCheckboxes.includes(option.id)}
              onCheckedChange={handleChange(option.id)}
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default FilterDropdown;
