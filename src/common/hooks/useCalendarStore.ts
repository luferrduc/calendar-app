import { CalendarEventType, EventType } from "@/calendar/types/calendar.types"
import { toCalendarEvent, toCalendarEvents } from "@/helpers/eventConverter"
import { addNewEvent, onDeleteEvent, onSetActiveEvent, updateEvent } from "@/store/calendar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"


export const useCalendarStore = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent } = useAppSelector(state => state.calendar)

  const calendarEvents: CalendarEventType[] = toCalendarEvents(events)
  const calendarActiveEvent: CalendarEventType | null =  activeEvent ? toCalendarEvent(activeEvent) : null

  const setActiveEvent = (event: EventType | null) => {
    dispatch(onSetActiveEvent(event))
  }


  const startSavingEvent = async(event: EventType) => {
    // TODO: llegar al backend

    // Si va todo bien
    if(event._id !== undefined) {
      // actualizando
      dispatch(updateEvent(event))
    } else{
      // creando
      const newEvent: EventType = {
        ...event,
        _id: new Date().getTime()
      }
      dispatch(addNewEvent(newEvent))
    }
  }

  const startDeletingEvent = () => {
    // TODO: llegar al backend
    dispatch(onDeleteEvent())
  }


  // const createNewEvent = (event: EventType) => {
  //   const newEvent: EventType = {
  //     _id: new Date().getTime(),
  //     ...event
  //   }
  //   dispatch(addNewEvent(newEvent))
  //   setActiveEvent(newEvent)
  // }

  return {
    //* Props
    events,
    activeEvent,
    calendarEvents,
    calendarActiveEvent,
    hasEventActive: !!activeEvent,
    //* Methods
    setActiveEvent,
    // createNewEvent,
    startSavingEvent,
    startDeletingEvent
  }
}