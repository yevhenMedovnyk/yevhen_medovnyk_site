import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IImage } from '../types/IImage';
import { baseUrl } from '../constants';

export const imagesApi = createApi({
	reducerPath: 'imagesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'album-gallery',
	}),
	tagTypes: ['Images'],

	endpoints: (builder) => ({
		getImages: builder.query<IImage[], string | undefined>({
			query: (albumId) => `?albumId=${albumId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),
		getImageIds: builder.query<{ _id: string; width: number; height: number }[], string>({
			query: (albumId) => `/image-ids?albumId=${albumId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),

		// ❗ Отримати конкретне зображення
		getImage: builder.query<IImage, string>({
			query: (imageId) => `/image?imageId=${imageId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),
		uploadImages: builder.mutation({
			query: (images = []) => ({
				url: '/upload-image',
				method: 'POST',
				body: images,
			}),
			invalidatesTags: ['Images'],
		}),
		deleteImage: builder.mutation({
			query: (imageId) => ({
				url: `/delete-image?imageId=${imageId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Images'],
		}),
	}),
});

export const {
	useGetImagesQuery,
	useUploadImagesMutation,
	useDeleteImageMutation,
	useGetImageQuery,
	useGetImageIdsQuery,
} = imagesApi;
