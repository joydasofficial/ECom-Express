import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  name: '',
  email: '',
  username: '',
  password: '',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentUser: (state, {payload})=>{
      state.id = payload.id
      state.name = payload.name.firstname+' '+payload.name.lastname 
      state.email = payload.email
      state.username = payload.username
      state.password = payload.password
    }
  }
})

export const {currentUser} = UserSlice.actions

export default UserSlice.reducer