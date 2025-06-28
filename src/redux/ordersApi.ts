import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';
import { IOrder } from '../types/IOrder';

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'orders/',
	}),
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		getOrders: builder.query<IOrder[], void>({
			query: () => 'get-orders',
			providesTags: (result) => (result ? [{ type: 'Orders', id: 'LIST' }] : []),
		}),
		getOrderById: builder.query<IOrder, string>({
			query: (order_id) => `get-order?orderId=${order_id}`,
			providesTags: (result) => (result ? [{ type: 'Orders', id: 'LIST' }] : []),
		}),
		updateOrder: builder.mutation({
			query: ({ order_id, ...updatedData }) => ({
				url: `update-order`,
				method: 'PUT',
				body: { order_id, ...updatedData },
			}),
			invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
		}),
	}),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery, useUpdateOrderMutation } = ordersApi;
