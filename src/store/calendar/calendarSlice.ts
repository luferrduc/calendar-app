// import { RootState } from '...'
import { EventType } from '@/calendar/types/calendar.types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'



const tempEvent: EventType =   {
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
      create: (state, action: PayloadAction<string>) => {
      
    },

  },
})

// Action creators are generated for each case reducer function
export const { create } = calendarSlice.actions
// export const selectTemplate = (state: RootState) => state.