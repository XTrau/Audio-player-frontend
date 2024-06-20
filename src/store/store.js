import { configureStore } from '@reduxjs/toolkit'
import trackListReducer from './slices/trackListReducer'

const store = configureStore({
  reducer: {
    currentTrack: trackListReducer,
  },
})

export default store
