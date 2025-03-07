import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/IUser';
import { baseUrl } from '../constants';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	tagTypes: ['Users'],
	endpoints: (builder) => ({
		getUserByUID: builder.query<IUser, string | null>({
			query: (uid) => `/user?uid=${uid}`,
			providesTags: (result) => [{ type: 'Users', id: result?.uid }],
		}),
		createUser: builder.mutation<IUser, IUser>({
			query: (newUser) => ({
				url: '/user-create',
				method: 'POST',
				body: newUser,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
	}),
});

export const { useGetUserByUIDQuery, useCreateUserMutation, useLazyGetUserByUIDQuery } = usersApi;
