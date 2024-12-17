import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from "../../services/userService.js";

export const fetchLikedTrackIds = createAsyncThunk('favourite/fetchLikedTrackIds', async (_, {rejectWithValue}) => {
	try {
		const response = await UserService.get_liked_ids();
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return rejectWithValue(error.response.status);
	}
});

const favouriteListSlice = createSlice({
	name: 'favourite', initialState: {
		trackListIds: [], loading: true,
	}, reducers: {
		like_track: (state, action) => {
			state.trackListIds.push(action.payload); //= [...state.trackListIds, action.payload];
			UserService.like_track(action.payload);
		}, unlike_track: (state, action) => {
			state.trackListIds = state.trackListIds.filter(id => id !== action.payload);
			UserService.unlike_track(action.payload);
		}
	}, extraReducers: (builder) => {
		builder
		.addCase(fetchLikedTrackIds.pending, (state) => {
			state.loading = true;
		})
		.addCase(fetchLikedTrackIds.fulfilled, (state, action) => {
			state.loading = false;
			state.trackListIds = [...action.payload];
		})
		.addCase(fetchLikedTrackIds.rejected, (state) => {
			state.loading = false;
		});
	}
});

export default favouriteListSlice.reducer;
export const {like_track, unlike_track, check_liked} = favouriteListSlice.actions;