import {createSlice, isAnyOf } from '@reduxjs/toolkit';
import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import { API_URL } from '../config';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: `cart/checkout/${body.id}`,
        method: 'POST',
        body: body.body,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (orderId) => `/orders/${orderId}`,
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
} = orderApi;

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    item: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(useGetOrderByIdQuery.pending, useGetAllOrdersQuery.pending), (state) => {
        state.status = 'loading';
      })
      .addMatcher(isAnyOf(useGetOrderByIdQuery.fulfilled, useGetAllOrdersQuery.fulfilled), (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addMatcher(isAnyOf(useGetOrderByIdQuery.rejected, useGetAllOrdersQuery.rejected), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addMatcher(isAnyOf(useCreateOrderMutation.fulfilled, useUpdateOrderStatusMutation.fulfilled), (state, action) => {
        state.status = 'succeeded';
      })
      .addMatcher(isAnyOf(useCreateOrderMutation.rejected, useUpdateOrderStatusMutation.rejected), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
  
  
  export default orderSlice.reducer;