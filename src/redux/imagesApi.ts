import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IImage } from '../types/IImage';
import { baseUrl } from '../constants';

export const imagesApi = createApi({
	reducerPath: 'imagesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'images/',
	}),
	tagTypes: ['Images'],

	endpoints: (builder) => ({
		getImages: builder.query<IImage[], string | undefined>({
			query: (albumId) => `all-images-in-album?albumId=${albumId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),
		getImageIds: builder.query<{ _id: string; width: number; height: number }[], string>({
			query: (albumId) => `/image-id-in-album?albumId=${albumId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),

		// ❗ Отримати конкретне зображення
		getImage: builder.query<IImage, string>({
			query: (imageId) => `/image-by-id?imageId=${imageId}`,
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
		addImageDescription: builder.mutation({
			query: (data) => ({
				url: '/add-image-description',
				method: 'POST',
				body: data,
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
	useAddImageDescriptionMutation,
} = imagesApi;
