import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    isLoggedin: false,
    username: null,
    name: null,
  },
  reducers: {
    logInSuccessful: (user, action) => {
      user.username = action.payload.username;
      user.name = action.payload.name;
      user.isLoggedin = true;
      //todo --> add info and other stuff after
    },
    logInFailed: (user, action) => {
      user.isLoggedin = false;
      user.name = null;
      user.username = null;
    },
    logOutUser: (user, action) => {
      user.isLoggedin = false;
      user.name = null;
      user.username = null;
    },
  },
});

export const { logInSuccessful, logInFailed, logOutUser } = slice.actions;

export default slice.reducer;

//! action creators
