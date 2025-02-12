import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAlbum } from '../types/IAlbum';
import { baseUrl } from '../constants';

export const albumsApi = createApi({
	reducerPath: 'albumsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	tagTypes: ['Albums'],
	endpoints: (builder) => ({
		getAlbums: builder.query<IAlbum[], void>({
			query: () => '/',
			providesTags: (result) => (result ? [{ type: 'Albums' as const, id: 'LIST' }] : []),
		}),
		getAlbumById: builder.query<IAlbum, string>({
			query: (id) => `/album?albumId=${id}`,
			providesTags: (result) => (result ? [{ type: 'Albums' as const, id: 'LIST' }] : []),
		}),
		createAlbum: builder.mutation<IAlbum, IAlbum>({
			query: (newAlbum) => ({
				url: '/create-album',
				method: 'POST',
				body: newAlbum,
			}),
			invalidatesTags: [{ type: 'Albums' as const, id: 'LIST' }],
		}),
		updateAlbum: builder.mutation<IAlbum, Partial<IAlbum> & { albumId: string }>({
			query: ({ albumId, ...updatedData }) => ({
				url: `/update-album`,
				method: 'PUT',
				body: { albumId, ...updatedData },
			}),
			invalidatesTags: [{ type: 'Albums', id: 'LIST' }],
		}),

		deleteAlbum: builder.mutation<{ success: boolean }, number>({
			query: (albumId) => ({
				url: `/delete-album?albumId=${albumId}`,
				method: 'POST',
			}),
			invalidatesTags: [{ type: 'Albums' as const, id: 'LIST' }],
		}),
	}),
});

export const {
	useGetAlbumsQuery,
	useCreateAlbumMutation,
	useGetAlbumByIdQuery,
	useDeleteAlbumMutation,
	useUpdateAlbumMutation,
} = albumsApi;
