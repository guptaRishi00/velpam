import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  providerId: string;
  ocassion: string;
  recipientName: string;
  recipientContact: string; // Added
  message: string;
  providerType: string; // Added (for Hotel/Restaurant etc)
  providerName: string; // Added (for Jacob/Valpem Partner)
  deliveryLocation: string;
  deliveryDate: string;
  deliveryTime: string; // Added
  customerName: string;
  customerEmail: string;
  customerContact: string; // Added
}

interface OrderState {
  isOrderPlaced: boolean;
  order: Order | null;
}

const initialState: OrderState = {
  isOrderPlaced: false,
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
      state.isOrderPlaced = true;
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
