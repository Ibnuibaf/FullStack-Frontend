import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getReviews=createAsyncThunk("reviews/getReviews",async (_,{rejectWithValue})=>{
    try {
        const res=await api.get('/review/all')
        console.log(res.data.reviews);
        return res.data.reviews
    } catch (error) {
        console.error("Error fetching user:", error);
        return rejectWithValue(error.response.data.message)
    }
})