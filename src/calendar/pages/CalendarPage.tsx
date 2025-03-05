import { Calendar, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'

import { Navbar } from "../components/Navbar"
import { localizer, getMessagesES } from '@/helpers'
import { CalendarEvent } from '../components'
import { EventType } from '../types/calendar.types'
import { useState } from 'react'




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

  const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') || 'week') as View)

  const eventStyleGetter = (event, start, end, isSelected) => {
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
  }

  const onViewChange = (event: string) => {
    localStorage.setItem('lastView', event)
  }

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
        onView={onViewChange}
      />
    </>
  )
}