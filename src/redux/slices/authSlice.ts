import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';

const initialState: { user: IUser } = {
	user: {
		displayName: '',
		email: '',
		uid: '',
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
