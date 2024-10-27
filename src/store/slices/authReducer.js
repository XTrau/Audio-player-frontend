import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from "../../services/authService.js";

export const checkAuthenticated = createAsyncThunk('auth/checkAuthenticated', async (_, {rejectWithValue}) => {
	try {
		const response = await AuthService.me();
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return rejectWithValue(error.response.status);
	}
});

const authSlice = createSlice({
	name: 'auth', initialState: {
		isAuthenticated: false, user: null, loading: false,
	}, reducers: {
		logout: async (state) => {
			await AuthService.logout();
			state.isAuthenticated = false;
			state.user = null;
		}
	}, extraReducers: (builder) => {
		builder
		.addCase(checkAuthenticated.pending, (state) => {
			state.loading = true;
		})
		.addCase(checkAuthenticated.fulfilled, (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload;
		})
		.addCase(checkAuthenticated.rejected, (state) => {
			state.loading = false;
			state.isAuthenticated = false;
		});
	}
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;