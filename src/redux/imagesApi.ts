import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IImage } from '../types/IImage';

export const imagesApi = createApi({
	reducerPath: 'imagesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/',
	}),
	endpoints: (builder) => ({
		getImages: builder.query<IImage[], string | undefined>({
			query: (albumId) => `gallery?albumId=${albumId}`,
		}),
		uploadImages: builder.mutation({
			query: (images = []) => ({
				url: '/gallery/upload-image',
				method: 'POST',
				body: images,
			}),
		}),
	}),
});

export const { useGetImagesQuery, useUploadImagesMutation } = imagesApi;
