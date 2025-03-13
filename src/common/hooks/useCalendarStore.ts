import { CalendarEventType, EventType } from "@/calendar/types/calendar.types"
import { toCalendarEvent, toCalendarEvents } from "@/helpers/eventConverter"
import { onSetActiveEvent } from "@/store/calendar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"


export const useCalendarStore = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent } = useAppSelector(state => state.calendar)

  const calendarEvents: CalendarEventType[] = toCalendarEvents(events)
  const calendarActiveEvent: CalendarEventType | null =  activeEvent ? toCalendarEvent(activeEvent) : null

  const setActiveEvent = (event: EventType) => {
    dispatch(onSetActiveEvent(event))
  }

  return {
    //* Props
    events,
    activeEvent,
    calendarEvents,
    calendarActiveEvent,
    //* Methods
    setActiveEvent
  }
}