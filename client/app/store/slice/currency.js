"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      const { currency } = action.payload;
      state.currency = currency;
    }
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
