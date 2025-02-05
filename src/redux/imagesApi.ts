import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IImage } from '../types/IImage';

export const imagesApi = createApi({
	reducerPath: 'imagesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/',
	}),
	tagTypes: ['Images'],

	endpoints: (builder) => ({
		getImages: builder.query<IImage[], string | undefined>({
			query: (albumId) => `gallery?albumId=${albumId}`,
			providesTags: (result) => (result ? [{ type: 'Images' as const, id: 'LIST' }] : []),
		}),
		uploadImages: builder.mutation({
			query: (images = []) => ({
				url: '/gallery/upload-image',
				method: 'POST',
				body: images,
			}),
			invalidatesTags: ['Images'],
		}),
		deleteImage: builder.mutation({
			query: (imageId) => ({
				url: `/gallery/delete-image?imageId=${imageId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Images'],
		}),
	}),
});

export const { useGetImagesQuery, useUploadImagesMutation, useDeleteImageMutation } = imagesApi;
