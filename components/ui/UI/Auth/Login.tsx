import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import axios from "axios";
import Cookies from 'js-cookie';
import { Loader } from "../Loader/Loader";
import AxiosHelper from "@/Helpers/AxiosHelper";

const userSchecma = z.object({
  userName: z
    .string()
    .min(3, "Your username must contain atleast 3 characters long!")
    .max(50, "Your Full Name must contain atmost 50 characters long!"),
  password: z.string().min(1, "Your password must contain atleast 1 characters long!")
    .max(30, "Your password must contain atmost 30 characters long!"),
  isGuest: z.boolean().default(false)
});

type IUserLogin = z.infer<typeof userSchecma>;

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const axiosHelper = new AxiosHelper();
  const [userData, setUserData] = useState<IUserLogin>();
  const [formErrors, setFormErrors] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      //validate form data
      const validatedData = userSchecma.parse(userData);

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