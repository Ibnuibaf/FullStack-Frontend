import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/productsActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getProducts.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setProducts } = productsSlice.actions;

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
