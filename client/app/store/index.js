"use client"
import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./slice/date";
import overviewSlice from "./slice/overview";
import currencySlice from "./slice/currency";

const store = configureStore({
    reducer:{
        currency:currencySlice,
        date:dateSlice,
        overview:overviewSlice,
    }
})

export default store;