"use client";
import { FunctionComponent, ReactNode } from "react";
import { store } from "../State/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

interface Props {
  children: ReactNode
}

export const ReduxProvider: FunctionComponent<Props> = ({ children }) => {
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
