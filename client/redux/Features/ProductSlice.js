import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', async()=>{
  let productsList = await axios.get("https://fakestoreapi.com/products")
  return productsList.data
})

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action)=>{
      state.list = action.payload;
    })
  }
})

// export const {} = ProductSlice.actions

export default ProductSlice.reducer