import { useCastleListing } from "@/contexts/CastleListingContext";
import { Calendar } from "./ui/calendar";

type DateCalendarProps = {
  onChange?: (...event: any[]) => void;
  selected?: any;
  disabledDates?: string[];
};

const DateCalendar = ({
  onChange,
  selected,
  disabledDates,
}: DateCalendarProps) => {
  const { selectedDates, actions } = useCastleListing();

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
          className="w-85 self-center"
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
          className="w-85 self-center"
        />
      )}
    </>
  );
};
export default DateCalendar;
