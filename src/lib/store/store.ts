import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import orderReducer from "./features/order/orderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      order: orderReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
