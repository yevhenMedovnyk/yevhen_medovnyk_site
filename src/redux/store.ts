import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from './slices/authSlice';
import { imagesApi } from './imagesApi';
import { albumsApi } from './albumsApi';
import { usersApi } from './usersApi';
import { storeApi } from './storeApi';
import { mailApi } from './mailApi';

export const store = configureStore({
	reducer: {
		[imagesApi.reducerPath]: imagesApi.reducer,
		[albumsApi.reducerPath]: albumsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[storeApi.reducerPath]: storeApi.reducer,
		[mailApi.reducerPath]: mailApi.reducer,
		auth,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			imagesApi.middleware,
			albumsApi.middleware,
			usersApi.middleware,
			mailApi.middleware,
			storeApi.middleware,
		]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
