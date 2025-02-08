import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { imagesApi } from './imagesApi';
import { foldersApi } from './foldersApi';
import { usersApi } from './usersApi';
import auth from './slices/authSlice';

export const store = configureStore({
	reducer: {
		[imagesApi.reducerPath]: imagesApi.reducer,
		[foldersApi.reducerPath]: foldersApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		auth,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			imagesApi.middleware,
			foldersApi.middleware,
			usersApi.middleware,
		]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
