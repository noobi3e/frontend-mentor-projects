import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Theme {
  darkmode: boolean
  fontTheme: string
  isInitial: boolean
}

const init: Theme = {
  darkmode: false,
  fontTheme: 'serif',
  isInitial: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState: init,
  reducers: {
    changeColorTheme(state, action: PayloadAction<boolean>) {
      state.darkmode = action.payload
    },

    changeFontTheme(state, action: PayloadAction<string>) {
      state.fontTheme = action.payload
    },
    changeInitial(state) {
      state.isInitial = false
    },
  },
})

export const themeAction = themeSlice.actions
