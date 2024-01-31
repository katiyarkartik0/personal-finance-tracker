"use client";
import { createSlice } from "@reduxjs/toolkit";
const date = {
  day: "",
  month: "",
  year: "",
};

const initialState = {date};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDay: (state, action) => {
      const { day } = action.payload;
      state.date.day = day;
    },
    setMonth: (state, action) => {
      const { month } = action.payload;
      state.date.month = month;
    },
    setYear: (state, action) => {
      const { year } = action.payload;
      state.date.year = year;
    },
  },
});

export const { setDay, setMonth, setYear } = dateSlice.actions;
export default dateSlice.reducer;
