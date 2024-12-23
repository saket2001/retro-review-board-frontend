import Cookies from "js-cookie";

class CommonHelper {
  GetPreviousVisitedUrl = (): string => {
    let url = "";
    if (document) url = document?.referrer;

    return url;
  };

  SetAuthUserCookies = (result: {
    refreshToken: string;
    accessToken: string;
    user: { loggedInUserId: string; loggedInUserName: string };
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
  };
}

export default CommonHelper;
