"use client";

import { store } from "../State/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export function ReduxProvider({ children }) {
  return <Provider store={store}>
    {children}
    <ToastContainer
      position="bottom-right"
      newestOnTop={true}
      closeOnClick
      autoClose={1500}
    />
  </Provider>
}
