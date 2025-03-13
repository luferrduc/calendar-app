import { EventType } from "@/calendar/types/calendar.types"
import { onSetActiveEvent } from "@/store/calendar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"


export const useCalendarStore = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent } = useAppSelector(state => state.calendar)

  const setActiveEvent = (event: EventType) => {
    dispatch(onSetActiveEvent(event))
  }

  return {
    //* Props
    events,
    activeEvent,
    //* Methods
    setActiveEvent
  }
}