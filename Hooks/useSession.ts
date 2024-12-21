"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/State/stateExports";
import { logoutUser, updateLoginStateData } from "@/State/Slices/LoginSlice";
import { useRouter } from "next/navigation";

export const useSession = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const accessToken = Cookies.get("access-token");
  const refreshToken = Cookies.get("refresh-token");
  const userId = Cookies.get("loggedInUserId");
  const userName = Cookies.get("loggedInUserName");

  useEffect(() => {
    if (
      accessToken &&
      refreshToken &&
      accessToken.trim().length > 0 &&
      refreshToken.trim().length > 0
    ) {
      dispatch(
        updateLoginStateData({
          isLoggedIn: true,
          loginToken: accessToken,
          loggedInUserId: userId,
          loggedInUserName: userName,
        })
      );
      setIsLoggedIn(true);
    } else {
      dispatch(logoutUser());
      router.replace("/auth");
      return setIsLoggedIn(false);
    }
  }, [accessToken, refreshToken, userId, userName, dispatch, router]);

  return { isLoggedIn };
};
