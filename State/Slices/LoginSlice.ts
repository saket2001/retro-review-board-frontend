import { createSlice } from "@reduxjs/toolkit";
import ILoginState from "@/Interfaces/ILoginState";
import Cookies from "js-cookie";

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
    logoutUser: (state) => {
      Cookies.remove("access-token");
      Cookies.remove("refresh-token");
      Cookies.remove("loggedInUserId");
      Cookies.remove("loggedInUserName");
      state.isLoggedIn = false;
      state.loginToken = "";
      state.loggedInUserId = "";
      state.loggedInUserName = "";
      state.loginTokenExpiresIn = "";
      state.isGuestUser = true;
    },
  },
});

export const { toggleLogin, toggleLoginTo, updateLoginStateData, logoutUser } =
  loginSlice.actions;

export default loginSlice.reducer;
