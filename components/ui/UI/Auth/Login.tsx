import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/MyButton";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import Cookies from 'js-cookie';
import { Loader } from "../Loader/Loader";
import AxiosHelper from "@/Helpers/AxiosHelper";
import { useAppDispatch } from "@/State/stateExports";

const userSchecma = z.object({
  userName: z
    .string()
    .min(3, "Your username must contain atleast 3 characters long!")
    .max(50, "Your Full Name must contain atmost 50 characters long!"),
  password: z.string().min(8, "Your password must contain atleast 8 characters!")
    .max(30, "Your password must contain atmost 30 characters long!"),
  isGuest: z.boolean().default(false)
});

type IUserLogin = z.infer<typeof userSchecma>;

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const axiosHelper = new AxiosHelper();
  const [userData, setUserData] = useState<IUserLogin>({ userName: "", password: "", isGuest: false });
  const [formErrors, setFormErrors] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prev) => {
      if (prev) {
        return {
          ...prev,
          [name]: value,
        };
      }
      return undefined;
    });
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      //validate form data
      const validatedData = userSchecma.parse(userData);

      if (validatedData == undefined || Object.keys(validatedData).length == 0)
        toast.error("Please fill all highlighted fields")

      setUserData(validatedData);
      setFormErrors([]);

      const res = await axiosHelper.PostReq(`/auth/user-login`, validatedData)

      setIsLoading(false);
      if (res?.IsError) {
        toast.error(res?.Message);
        return;
      } else {
        toast.success(res?.Message);

        const result = res?.data;
        //handle state
        dispatch(updateLoginStateData({
          isLoggedIn: true,
          loginToken: result?.accessToken,
          loggedInUserId: result?.user?.loggedInUserId,
          loggedInUserName: result?.user?.loggedInUserName,
          loginTokenExpiresIn: "",
          isGuestUser: false,
        }))

        //storing refresh tokken
        Cookies.set('login-refresh-token', result?.refreshToken, { expires: 1, path: '/' });

        setTimeout(() => router.push("/board"), 2000);
      }

    } catch (err: unknown) {
      console.log(err);
      setIsLoading(false);
      if (err !== undefined && err?.length > 0) {
        const validationErrors = err?.flatten().fieldErrors;
        setFormErrors(validationErrors);
      }
      toast.error("Something went wrong from our side. Please wait")
    }
  }

  return (
    <>
      {IsLoading && <Loader />}
      <Card className="bg-gray-100">
        <CardHeader>
          <CardTitle>Welcome Back, User!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="userName" value={userData?.userName} onChange={handleInputChange} />
            {formErrors?.userName && (
              <p className="text-red-600 text-sm font-medium">
                {formErrors?.userName}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="Password">Password</Label>
            <Input type="password" id="Password" name="password" value={userData?.password} onChange={handleInputChange} />
            {formErrors?.password && (
              <p className="text-red-600 text-sm font-medium">
                {formErrors?.password}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={(e) => handleFormSubmit(e)}>Submit</Button>
        </CardFooter>
      </Card>
    </>
  );
}