import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFolder } from '../types/IFolder';

export const foldersApi = createApi({
	reducerPath: 'foldersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/',
	}),
	tagTypes: ['Folders'],
	endpoints: (builder) => ({
		getFolders: builder.query<IFolder[], void>({
			query: () => '/',
			providesTags: (result) => (result ? [{ type: 'Folders' as const, id: 'LIST' }] : []),
		}),
		getFolderById: builder.query<IFolder, string>({
			query: (id) => `/folder?folderId=${id}`,
			providesTags: (result) => (result ? [{ type: 'Folders' as const, id: 'LIST' }] : []),
		}),
		createFolder: builder.mutation<IFolder, IFolder>({
			query: (newFolder) => ({
				url: '/create-folder',
				method: 'POST',
				body: newFolder,
			}),
			invalidatesTags: [{ type: 'Folders' as const, id: 'LIST' }],
		}),
		updateFolder: builder.mutation<IFolder, Partial<IFolder> & { folderId: string }>({
			query: ({ folderId, ...updatedData }) => ({
				url: `/update-folder`,
				method: 'PUT',
				body: { folderId, ...updatedData },
			}),
			invalidatesTags: [{ type: 'Folders', id: 'LIST' }],
		}),

		deleteFolder: builder.mutation<{ success: boolean }, number>({
			query: (folderId) => ({
				url: `/delete-folder?folderId=${folderId}`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Folders' as const, id: 'LIST' }],
		}),
	}),
});

export const {
	useGetFoldersQuery,
	useCreateFolderMutation,
	useGetFolderByIdQuery,
	useDeleteFolderMutation,
	useUpdateFolderMutation,
} = foldersApi;
