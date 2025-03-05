import { EventType } from "../types/calendar.types"


// TODO: memo para cuando sean demasiados eventos
export const CalendarEvent = ({ event }: { event: EventType }) => {
  const { title, user } = event
  return (
    <>
      <strong> {title} </strong>
      <span> - {user.name} </span>
    </>
  )
}