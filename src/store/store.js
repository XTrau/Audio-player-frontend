import { configureStore } from '@reduxjs/toolkit'
import trackListReducer from './slices/trackListReducer'
import authReducer from "./slices/authReducer.js";

const store = configureStore({
	reducer: {
		trackList: trackListReducer, auth: authReducer,
	},
})

export default store
