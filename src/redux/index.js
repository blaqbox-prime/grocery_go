import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import productReducer, { productApi } from "./ProductSlice";
import cartReducer, { cartApi } from "./CartSlice";
import userReducer from "./UserSlice";
import { orderApi } from "./OrderSlice";

const rootReducer = combineReducers({
  [productApi.reducerPath] : productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  authUser: userReducer,
  [orderApi.reducerPath]: orderApi.reducer

});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(productApi.middleware)
    .concat(cartApi.middleware)
    .concat(orderApi.middleware)
});

export default store;
