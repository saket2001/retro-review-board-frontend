export default interface ILoginState {
  isLoggedIn: boolean;
  loginToken: string;
  loggedInUserId: string;
  loggedInUserName: string;
  loginTokenExpiresIn: string;
  isGuestUser: boolean;
}
