import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../Features/UserSlice'
import productReducer from '../Features/ProductSlice'

export const store = configureStore({
  reducer : {
    user: userReducer,
    product: productReducer,
  }
})