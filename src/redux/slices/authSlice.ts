import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';

const initialState: { user: IUser } = {
	user: {
		displayName: '',
		email: '',
		uid: '',
		isAdmin: false,
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			if (action.payload) {
				state.user = action.payload;
			} else {
				console.error('Invalid payload: payload is null or undefined');
			}
		},
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
