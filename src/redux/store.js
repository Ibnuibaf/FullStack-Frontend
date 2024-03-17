import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import reviewsSlice from "./slices/reviewsSlice";

const store = configureStore({
    reducer:{
        products: productsSlice,
        user:userSlice,
        reviews: reviewsSlice
    }
})

export default store