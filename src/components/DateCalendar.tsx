import { useCastleListing } from "@/contexts/CastleListingContext";
import { Calendar } from "./ui/calendar";

import classNames from "react-day-picker/style.module.css";
import { getDefaultClassNames } from "react-day-picker";

type DateCalendarProps = {
  onChange?: (...event: any[]) => void;
  selected?: any;
  disabledDates?: string[];
};

console.log(classNames);

const DateCalendar = ({
  onChange,
  selected,
  disabledDates,
}: DateCalendarProps) => {
  const { selectedDates, actions } = useCastleListing();
  const defaultClassNames = getDefaultClassNames();
  console.log(defaultClassNames.day_button);

  return (
    <>
      {disabledDates ? (
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
          disabled={{
            before: new Date(disabledDates[0]),
            after: new Date(disabledDates[disabledDates.length - 1]),
          }}
          excludeDisabled
          className="w-85 self-center sm:w-60"
        />
      ) : (
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
          disabled={{ before: new Date() }}
          className="w-75 self-center sm:w-60 p-0"
          classNames={{ month: "space-y-1 flex flex-col" }}
        />
      )}
    </>
  );
};
export default DateCalendar;
