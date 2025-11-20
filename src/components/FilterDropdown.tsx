import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
  const { filterCheckboxes, actions } = useCastleListing();

  // https://stackoverflow.com/questions/60408612/how-to-select-one-checkbox-from-a-mapped-multiple-checkboxes-react-js
  const handleChange = (option: string) => () => {
    onHandleSelectOptions(name, option);
    actions.updateFilterboxes(option);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-60 flex justify-between">
          <Button
            variant="default"
            className="bg-[url(assets/Arrow_down.svg)] bg-no-repeat bg-position-[200px]"
          >
            {name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 bg-(--primary) text-white">
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
