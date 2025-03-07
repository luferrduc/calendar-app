import { useState } from 'react'
import { Calendar, SlotInfo, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'

import { Navbar } from "../components/Navbar"
import { localizer, getMessagesES } from '@/helpers'
import { CalendarEvent, CalendarModal } from '../components'
import { EventType } from '../types/calendar.types'




const events: EventType[]= [
  {
    title: 'Cumple del jefe',
    notes: 'hay que comprar los bebestibles',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Luciano'
    }
  }
]

export const CalendarPage = () => {

  const [lastView] = useState<View>((localStorage.getItem('lastView') || 'week') as View)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const onDoubleClick = (event: EventType) => {
    console.log({ doubleClick: event })
  }

  const onSelect = (event: EventType) => {
    console.log({ click: event })
    setIsOpen(true)
  }
  
  
  const onSelectSlot = (slotInfo: SlotInfo) => {
    // console.log(event)
    // console.log({ slotInfo : slotInfo })
    
    setIsOpen(true)
  }


  const onViewChange = (event: string) => {
    localStorage.setItem('lastView', event)
  }
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
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
        onSelectSlot={onSelectSlot}
        onView={onViewChange}
        selectable

      />
      <CalendarModal isOpen={isOpen} setIsOpen={setIsOpen}/> 
    </>
  )
}