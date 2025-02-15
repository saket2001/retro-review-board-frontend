import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/MyButton";
import { z, ZodError } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import IUser from "@/Interfaces/IUser";
import { useRouter } from "next/navigation";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { useAppDispatch } from "@/State/stateExports";
import CommonHelper from "@/Helpers/CommonHelper";

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

// type INewUserLogin = z.infer<typeof NewUserSchecma>;

export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUser>();
  const [formErrors, setFormErrors] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      //validate form data
      const validatedData = NewUserSchecma.parse(userData);

      setUserData(validatedData);
      setFormErrors([]);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-signup`, validatedData)

      setIsLoading(false)
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

        const helper = new CommonHelper();
        helper.SetAuthUserCookies(result);

        router.push(helper.GetCookie("previous_url_visted") ?? "/board");
      }

    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof ZodError) {
        const validationErrors = err.flatten().fieldErrors;
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
          <CardDescription>
            Add your details here. After saving, you&apos;ll be headed to the board.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form>
            <div className="space-y-1">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" name="fullName" value={userData?.fullName} onChange={handleInputChange} />
              {formErrors?.fullName && (
                <p className="text-red-600 text-sm font-medium">
                  {formErrors?.fullName}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" name="userName" value={userData?.userName} onChange={handleInputChange} />
              {formErrors?.userName && (
                <p className="text-red-600 text-sm font-medium">
                  {formErrors?.userName}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
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
          <Button type="submit" onClick={(e) => handleFormSubmit(e)}>Submit</Button>
        </CardFooter>
      </Card>
    </>
  );
}


