import { useAppDispatch, useAppSelector } from "@/store/hooks"


export const useCalendarStore = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent } = useAppSelector(state => state.calendar)


  return {
    //* Props
    events,
    activeEvent
    //* Methods
  }
}