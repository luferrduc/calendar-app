// import { RootState } from '...'
import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  isDateModalOpen: boolean
}

const initialState: UIState = {
  isDateModalOpen: false
} 

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions
// export const selectTemplate = (state: RootState) => state.