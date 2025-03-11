import { apiSlice } from '../api/apiSlice';
import { Product, Batch } from '@/types';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    addBatch: builder.mutation<Product, { productId: string; batch: Partial<Batch> }>({
      query: ({ productId, batch }) => ({
        url: `/products/${productId}/batches`,
        method: 'POST',
        body: batch,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useAddBatchMutation,
} = productApi;