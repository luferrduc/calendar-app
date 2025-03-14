import { useState } from 'react'
import { Calendar, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from "../components/Navbar"
import { localizer, getMessagesES } from '@/helpers'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components'
import { CalendarEventType, EventType } from '../types/calendar.types'
import { useUiStore, useCalendarStore } from '@/common/hooks'
import { toEventType } from '@/helpers/eventConverter'


// const events: EventType[]= [
//   {
//     title: 'Cumple del jefe',
//     notes: 'hay que comprar los bebestibles',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Luciano'
//     }
//   }
// ]

export const CalendarPage = () => {

  const [lastView] = useState<View>((localStorage.getItem('lastView') || 'week') as View)
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { openDateModal } = useUiStore()
  const { setActiveEvent, calendarEvents, activeEvent } = useCalendarStore()


  const eventStyleGetter = () => {
    // console.log({event, start, end, isSelected})
    const style = {
      backgroundColor: '#347CF7',
      borderRaduis: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style 
    }
  }

  const onDoubleClick = (event: CalendarEventType) => {
    openDateModal()
  }

  const onSelect = (event: CalendarEventType) => {
    // openDateModal()
    const eventForRedux: EventType = toEventType(event)
    setActiveEvent(eventForRedux)

  }
  
  
  // const onSelectSlot = (slotInfo: SlotInfo) => {
  //   console.log({ start: slotInfo.start })
  //   setSelectedDate(slotInfo.start) 
  //   openDateModal()
  // }


  const onViewChange = (event: string) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={calendarEvents}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100dvh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        // onSelectSlot={onSelectSlot}
        onView={onViewChange}
        // selectable
        className='px-4 py-4'

      />
      <CalendarModal 
        // selectedDate={selectedDate} 
        /> 
        { (activeEvent && activeEvent?._id) && <FabDelete /> }
      <FabAddNew />
    </>
  )
}