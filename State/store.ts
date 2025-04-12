import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlice";
import boardSlice from "./Slices/BoardSlice";
import searchedBoardsSlice from "./Slices/SearchBoardSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      loginState: loginReducer,
      boardState: boardSlice,
      searchedBoardsState: searchedBoardsSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
