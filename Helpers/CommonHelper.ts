import Cookies from "js-cookie";

class CommonHelper {
  SetCookie = (key: string, value: string) => {
    Cookies.remove(key);
    Cookies.set(key, value, {
      secure: true,
      expires: 1,
      path: "/",
    });
  };

  GetCookie = (key: string) => {
    return Cookies.get(key);
  };

  SetAuthUserCookies = (result: {
    refreshToken: string;
    accessToken: string;
    user: {
      loggedInUserId: string;
      loggedInUserName: string;
      isGuestUser: boolean;
    };
  }) => {
    Cookies.set("refresh-token", result?.refreshToken, {
      secure: true,
      expires: 1,
      path: "/",
    });
    Cookies.set("access-token", result?.accessToken, {
      secure: true,
      expires: 1,
      path: "/",
    });

    //storing other details too
    Cookies.set("loggedInUserId", result?.user?.loggedInUserId);
    Cookies.set("loggedInUserName", result?.user?.loggedInUserName);
    Cookies.set("isGuestUser", result?.user?.isGuestUser + "");
  };

  GetCurrentUrl = (): string => {
    return window !== undefined ? window.location.href : "";
  };

  GetPreviousVisitedUrl = (fallbackRoute: string): string => {
    return window !== undefined ? window.location.href : fallbackRoute;
  };
}

export default CommonHelper;
