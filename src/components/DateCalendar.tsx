import { useCastleListing } from "@/contexts/CastleListingContext"
import { Calendar } from "./ui/calendar"

const DateCalendar = () => {
  const { selectedDates, actions } = useCastleListing()

  return (
    <Calendar 
      mode="range"
      defaultMonth={selectedDates?.from}
      selected={selectedDates}
      onSelect={(selectedDates) => {actions.updateSelectedDates(selectedDates)}}
      numberOfMonths={1}
      timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
      className="w-85 self-center"
    />
  )
}
export default DateCalendar