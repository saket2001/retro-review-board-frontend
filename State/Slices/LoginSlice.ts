import { createSlice } from "@reduxjs/toolkit";
import ILoginState from "@/Interfaces/ILoginState";

const initialLoginSliceState: ILoginState = {
  isLoggedIn: false,
  loginToken: "",
  loggedInUserId: "",
  loggedInUserName: "",
  loginTokenExpiresIn: "",
  isGuestUser: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginSliceState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    toggleLoginTo: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateLoginStateData: (state, action) => {
      state.isLoggedIn = action.payload?.isLoggedIn;
      state.loginToken = action.payload?.loginToken;
      state.loggedInUserId = action.payload?.loggedInUserId;
      state.loggedInUserName = action.payload?.loggedInUserName;
      state.loginTokenExpiresIn = action.payload?.loginTokenExpiresIn;
      state.isGuestUser = action.payload?.isGuestUser;
    },
  },
});

export const { toggleLogin, toggleLoginTo, updateLoginStateData } =
  loginSlice.actions;

export default loginSlice.reducer;
