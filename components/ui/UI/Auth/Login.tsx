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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import axios from "axios";
import Cookies from 'js-cookie';

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
  const [userData, setUserData] = useState<IUserLogin>();
  const [formErrors, setFormErrors] = useState<IUserLogin>();

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

  const handleFormSubmit = async () => {
    try {
      //validate form data
      const validatedData = userSchecma.parse(userData);

      setUserData(validatedData);
      // setFormErrors({});

      //call db to save user
      //login the user if not did already
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-login`, validatedData)

      if (res?.data?.IsError) {
        toast.error(res?.data?.Message);
        return;
      } else {
        toast.success(res?.data?.Message);

        const result = res?.data?.Result;
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

    } catch (err) {
      const validationErrors = err?.flatten().fieldErrors;
      setFormErrors(validationErrors);
    }
  }

  return (
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
        <Button type="submit" onClick={(e) => { e.preventDefault(); handleFormSubmit() }}>Submit</Button>
      </CardFooter>
    </Card>
  );
}