import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { imagesApi } from './imagesApi';
import { foldersApi } from './foldersApi';

export const store = configureStore({
	reducer: {
		[imagesApi.reducerPath]: imagesApi.reducer,
		[foldersApi.reducerPath]: foldersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([imagesApi.middleware, foldersApi.middleware]),
});

setupListeners(store.dispatch);
