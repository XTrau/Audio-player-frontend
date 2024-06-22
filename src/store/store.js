import { configureStore } from '@reduxjs/toolkit'
import trackListReducer from './slices/trackListReducer'

const store = configureStore({
  reducer: {
    trackList: trackListReducer,
  },
})

export default store
