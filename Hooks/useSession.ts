"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/State/stateExports";
import { logoutUser, updateLoginStateData } from "@/State/Slices/LoginSlice";
import { useRouter } from "next/navigation";
import CommonHelper from "@/Helpers/CommonHelper";

export const useSession = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const accessToken = Cookies.get("access-token");
  const refreshToken = Cookies.get("refresh-token");
  const userId = Cookies.get("loggedInUserId");
  const userName = Cookies.get("loggedInUserName");
  const isGuestUser = Cookies.get("isGuestUser") === "true" ? true : false;

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
          isGuestUser,
        })
      );
      setIsLoggedIn(true);
    } else {
      //saving url in session only for board routes
      const helper = new CommonHelper();
      const currUrl = helper.GetCurrentUrl();

      if (!currUrl.includes("auth"))
        helper.SetCookie("previous_url_visted", currUrl);

      dispatch(logoutUser());
      router.replace("/auth");
      return setIsLoggedIn(false);
    }
  }, [
    accessToken,
    refreshToken,
    userId,
    userName,
    isGuestUser,
    dispatch,
    router,
  ]);

  return { isLoggedIn };
};
