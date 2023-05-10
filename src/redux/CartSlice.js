import {createSlice, isAnyOf } from '@reduxjs/toolkit';
import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { API_URL } from '../config';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes:['Cart'],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (body) => ({
        url: `/cart/add-to-cart`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (productId, customerId) => ({
        url: `/cart/remove-from-cart`,
        method: 'POST',
        body: JSON.stringify({ "product_id" : productId, "customer_id" : customerId }),
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: (customerId) => ({
        url: '/cart/clear',
        method: 'POST',
        body: {"customer_id" : customerId },
      }),
      invalidatesTags: ['Cart'],
    }),
    getCart: builder.query({
      query: (customerId) => `/cart/${customerId}`,
    }),
  }),
});

export const { useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation, useGetCartQuery } = cartApi;

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {},
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(useGetCartQuery.pending), (state) => {
        state.status = 'loading';
      })
      .addMatcher(isAnyOf(useGetCartQuery.fulfilled), (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addMatcher(isAnyOf(useGetCartQuery.rejected), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;