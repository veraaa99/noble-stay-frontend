import { useCastleListing } from "@/contexts/CastleListingContext";
import { Calendar } from "./ui/calendar";
import type { ControllerRenderProps } from "react-hook-form";

type DateCalendarProps = {
  onChange?: (...event: any[]) => void;
  selected?: any;
};

const DateCalendar = ({ onChange, selected }: DateCalendarProps) => {
  const { selectedDates, actions } = useCastleListing();

  return (
    <Calendar
      mode="range"
      defaultMonth={selectedDates?.from}
      selected={selected ? selected : selectedDates}
      onSelect={
        onChange
          ? onChange
          : (selectedDates) => {
              actions.updateSelectedDates(selectedDates);
            }
      }
      numberOfMonths={1}
      timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
      className="w-85 self-center"
    />
  );
};
export default DateCalendar;
