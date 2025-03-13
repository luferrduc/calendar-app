import { CalendarEventType } from "../types/calendar.types"


// TODO: memo para cuando sean demasiados eventos
export const CalendarEvent = ({ event }: { event: CalendarEventType }) => {
  const { title, user } = event
  return (
    <>
      <strong> {title} </strong>
      <span> - {user?.name} </span>
    </>
  )
}