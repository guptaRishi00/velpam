import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  value: number;
}

const initialState: authState = {
  value: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      console.log("state value from slice: ", state.value);
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
