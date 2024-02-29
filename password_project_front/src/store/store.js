import { configureStore, Tuple } from '@reduxjs/toolkit'
import { authSlice } from './endpoints/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})