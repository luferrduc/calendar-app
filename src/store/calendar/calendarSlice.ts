// import { RootState } from '...'
import { EventType } from '@/calendar/types/calendar.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'





const tempEvent: EventType =   {
    _id: new Date().getTime(),
    title: 'Cumple del jefe',
    notes: 'Hay que comprar los bebestibles',
    start: new Date().toISOString(),
    end: addHours(new Date(), 2).toISOString(),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Luciano'
    }
  }



export interface CalendarState {
  events: EventType[]
  activeEvent: EventType | null
  
}

const initialState: CalendarState = {
  events: [tempEvent],
  activeEvent: null 
} 

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<EventType>) => {        
      state.activeEvent = action.payload
    },
    addNewEvent: (state, action: PayloadAction<EventType>) => {
      state.events.push(action.payload)
      state.activeEvent = null
    },
    updateEvent: (state, action: PayloadAction<EventType>) => {
      state.events = state.events.map( event => {
        if(event._id === action.payload._id){
          return {
            _id: event._id,
            ...action.payload
          }
        }
        return event
      })
      state.activeEvent = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, addNewEvent, updateEvent } = calendarSlice.actions
// export const selectTemplate = (state: RootState) => state.