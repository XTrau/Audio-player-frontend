import { configureStore } from '@reduxjs/toolkit'
import trackListReducer from './slices/trackListReducer'
import authReducer from "./slices/authReducer.js";
import favouriteListReducer from "./slices/favouriteListReducer.js";

const store = configureStore({
	reducer: {
		trackList: trackListReducer, auth: authReducer, favourite: favouriteListReducer
	},
})

export default store
