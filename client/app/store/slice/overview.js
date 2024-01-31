"use client";

import { createSlice } from "@reduxjs/toolkit";

const overview = {
  datasets: [],
  labels: [],
};

const initialState = overview;

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {
    setOverview: (state, action) => {
      const { datasets, labels } = action.payload;
      state.datasets = datasets;
      state.labels = labels;
    },
  },
});

export const { setOverview } = overviewSlice.actions;
export default overviewSlice.reducer;
