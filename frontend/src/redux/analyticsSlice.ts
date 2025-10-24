import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSales = createAsyncThunk(
  "analytics/fetchSales",
  async () => {
    const res = await axios.get("/api/analytics/sales", { withCredentials: true });
    return res.data;
  }
);

export const fetchTopProducts = createAsyncThunk(
  "analytics/fetchTopProducts",
  async () => {
    const res = await axios.get("/api/analytics/top-products", { withCredentials: true });
    return res.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    sales: [],
    topProducts: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.sales = action.payload;
        state.loading = false;
      })
      .addCase(fetchSales.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      });
  }
});

export default analyticsSlice.reducer;