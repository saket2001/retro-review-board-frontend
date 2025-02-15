import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/State/stateExports";
import { logoutUser } from "@/State/Slices/LoginSlice";
import axios from "axios";
import { clearBoardData } from "@/State/Slices/BoardSlice";
import { toast } from "react-toastify";

const DEFAULT_AUTO_LOGOUT_INTERVAL = 60 * 60 * 1000; // 60 minutes

const useGuestAutoLogout = () => {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.loginState);

  useEffect(() => {
    // Auto logout after interval
    const logoutTimer = setTimeout(() => {
      dispatch(logoutUser());
      dispatch(clearBoardData());
      toast.info("User session expired, logging out...");
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        isGuestUser: loginState?.isGuestUser,
        userId: loginState?.loggedInUserId,
      });
    }, DEFAULT_AUTO_LOGOUT_INTERVAL);

    // Handle page unload
    const handleUnload = () => {
      const isUserOkay = window.confirm(
        "Are you sure to leave ? On closing the browser tab you will be logged out"
      );

      if (!isUserOkay) return;

      const data = JSON.stringify({
        isGuestUser: loginState?.isGuestUser,
        userId: loginState?.loggedInUserId,
      });
      const blob = new Blob([data], { type: "application/json" }); // Convert data to a Blob

      const success = navigator?.sendBeacon(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        blob
      );

      if (!success) {
        console.warn("sendBeacon failed. Falling back to fetch.");
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
          keepalive: true, // Ensures the request completes even after the page closes
        });
      }
    };

    if (loginState?.isGuestUser) {
      window.addEventListener("unload", handleUnload);
      window.addEventListener("beforeunload", handleUnload);
    }

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("unload", handleUnload);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [loginState, dispatch]);
};

export default useGuestAutoLogout;
