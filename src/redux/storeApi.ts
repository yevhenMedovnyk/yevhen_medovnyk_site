import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';
import { IStoreItem } from '../types/IStoreItem';

export const storeApi = createApi({
	reducerPath: 'storeApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	tagTypes: ['Store'],
	endpoints: (builder) => ({
		getProducts: builder.query<IStoreItem[], void>({
			query: () => '/store',
			providesTags: (result) => (result ? [{ type: 'Store' as const, id: 'LIST' }] : []),
		}),
		getProductIds: builder.query<
			{ _id: string; imgs: { width: number; height: number }[] }[],
			void
		>({
			query: () => '/store-item-ids',
			providesTags: (result) => (result ? [{ type: 'Store' as const, id: 'LIST' }] : []),
		}),
		getProductById: builder.query<IStoreItem, string>({
			query: (product_id) => ({
				url: '/store-item',
				params: { product_id },
			}),
			providesTags: (result) => (result ? [{ type: 'Store' as const, id: 'LIST' }] : []),
		}),
	}),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductIdsQuery } = storeApi;
