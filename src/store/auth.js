import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
       },
   
    logout: (state) => {
      state.user = null;
      state.accessToken = null;

    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;