import {createSlice, isAnyOf } from '@reduxjs/toolkit';
import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { API_URL } from '../config';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products/',
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/?category=${category}`
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products/update',
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const {  useCreateProductMutation, useGetProductsQuery, useGetProductsByCategoryQuery } = productApi;

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(useGetProductsQuery.pending), (state) => {
        state.status = 'loading';
      })
      .addMatcher(isAnyOf(useGetProductsQuery.fulfilled), (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addMatcher(isAnyOf(useGetProductsQuery.rejected, useCreateProductMutation.rejected), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addMatcher(isAnyOf(useGetProductsByCategoryQuery.pending, useCreateProductMutation.pending), (state) => {
        state.status = 'loading';
      })
      .addMatcher(isAnyOf(useGetProductsByCategoryQuery.fulfilled), (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addMatcher(isAnyOf(useGetProductsByCategoryQuery.rejected), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addMatcher(isAnyOf(useCreateProductMutation.fulfilled), (state, action) => {
        state.status = 'succeeded';
        console.log(action);
      })
  },
});

export default productSlice.reducer;