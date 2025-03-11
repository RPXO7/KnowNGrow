import { apiSlice } from '../api/apiSlice';
import { Order } from '@/types';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order'],
    }),
    addOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order', 'Product'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddOrderMutation,
} = orderApi;