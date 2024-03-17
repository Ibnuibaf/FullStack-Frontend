import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "../actions/reviewsActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getReviews.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getReviews.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setReviews } = reviewsSlice.actions;

export const selectReviews = (state) => state.reviews;

export default reviewsSlice.reducer;
