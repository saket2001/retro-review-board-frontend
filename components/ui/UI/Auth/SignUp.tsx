import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/MyButton";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import IUser from "@/Interfaces/IUser";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import axios from "axios";
import Cookies from 'js-cookie';

const NewUserSchecma = z.object({
  fullName: z.string().min(3, "Your Full Name must contain atleast 3 characters long!")
    .max(100, "Your Full Name must contain atmost 100 characters long!"),
  userName: z
    .string()
    .min(3, "Your username must contain atleast 3 characters long!")
    .max(50, "Your Full Name must contain atmost 50 characters long!"),
  password: z.string().min(8, "Your password must contain atleast 8 characters")
    .max(30, "Your password must contain atmost 30 characters long!"),
  isGuest: z.boolean().default(false)
});

type INewUserLogin = z.infer<typeof NewUserSchecma>;

export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<IUser>({ fullName: "", userName: "", password: "", isGuest: false });
  const [formErrors, setFormErrors] = useState<INewUserLogin>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prev) => {
      if (prev) {
        return {
          ...prev,
          [name]: value, // dynamically updating `userName`, `password`, or `isGuest`
        };
      }
      return undefined; // handle initial undefined state if needed
    });
  };

  const handleFormSubmit = async () => {
    try {
      //validate form data
      const validatedData = NewUserSchecma.parse(userData);

      setUserData(validatedData);

      //login the user if not did already
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-signup`, validatedData)

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
      toast.error("Please complete all highlighted fields to proceed")
    }
  }

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle>Greetings User</CardTitle>
        <CardDescription>
          To start using retro board and save all details, fill all the below details. After saving, you&apos;ll be headed to the board page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form>
          <div className="space-y-1">
            <Label htmlFor="fullname">Full Name <span className="required">*</span></Label>
            <Input id="fullname" name="fullName" value={userData?.fullName} onChange={handleInputChange} />
            {formErrors?.fullName && (
              <p className="text-red-600 text-sm font-medium">
                {formErrors?.fullName}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username <span className="required">*</span> </Label>
            <Input id="username" type="text" name="userName" value={userData?.userName} onChange={handleInputChange} />
            {formErrors?.userName && (
              <p className="text-red-600 text-sm font-medium">
                {formErrors?.userName}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password <span className="required">*</span></Label>
            <Input id="password" type="password" name="password" value={userData?.password} onChange={handleInputChange} />
            {formErrors?.password && (
              <p className="text-red-600 text-sm font-medium">
                {formErrors?.password}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={(e) => { e.preventDefault(); handleFormSubmit() }}>Submit</Button>
      </CardFooter>
    </Card>
  );
}


