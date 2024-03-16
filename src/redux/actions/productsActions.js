import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getProducts=createAsyncThunk("products/getProducts",async (_,{rejectWithValue})=>{
    try {
        const res=await api.get('/product/all')
        return res.data.products
    } catch (error) {
        console.error("Error fetching user:", error);
        return rejectWithValue(error.response.data.message)
    }
})