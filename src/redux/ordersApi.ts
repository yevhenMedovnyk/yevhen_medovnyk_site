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
	}),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
