import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFolder } from '../types/IFolder';

export const foldersApi = createApi({
	reducerPath: 'foldersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/',
	}),
	endpoints: (builder) => ({
		getFolders: builder.query<IFolder[], void>({
			query: () => ({
				url: '/',
				invalidatesTags: ['Folders'],
			}),
			providesTags: (result) => (result ? [{ type: 'Folders', id: 'LIST' }] : []),
		}),
		getFolderById: builder.query<IFolder, string>({
			query: (id) => ({
				url: `/folder?id=${id}`,
				invalidatesTags: ['Folders'],
			}),
			providesTags: (result) => (result ? [{ type: 'Folders', id: 'LIST' }] : []),
		}),
		createFolder: builder.mutation<IFolder, IFolder>({
			query: (newFolder) => {
				if (!newFolder) {
					throw new Error('Folder object is null or undefined');
				}

				return {
					url: '/create-folder',
					method: 'POST',
					body: newFolder,
				};
			},
			invalidatesTags: [{ type: 'Folders', id: 'LIST' }],
		}),
	}),
});

export const { useGetFoldersQuery, useCreateFolderMutation, useGetFolderByIdQuery } = foldersApi;
