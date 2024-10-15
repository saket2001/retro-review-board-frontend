"use client";
// import { FunctionComponent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/Components/ui/UI/Heading/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
// import LoginForm from "@/components/ui/UI/Auth/Login";
// import SignUpForm from "@/components/ui/UI/Auth/SignUp";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

// interface WelcomeAuthProps {}

const WelcomeAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [guestName, setGuestName] = useState("");

  const HandleGuestLogin = (e) => {
    e.preventDefault();
    if (guestName.length === 0)
      return toast.error("Please enter your full name", { autoClose: 1500 });

    // dispatch(toggleLogin())
    //will get set values from db req
    dispatch(updateLoginStateData({
      isLoggedIn: true,
      loginToken: "",
      loggedInUserId: uuidv4(),
      loggedInUserName: guestName,
      loginTokenExpiresIn: "",
    }))

    //add board id
    router.push("/board")
  }

  return (
    <section className="w-full h-full flex items-center justify-center">

      <div className="my-2 lg:my-8 w-3/4 lg:w-1/2 shadow-md flex flex-col items-center px-3 py-2 gap-y-2 lg:p-4 rounded-lg bg-gray-100">
        <Heading variant="h1" title="Welcome to the Retro Review Board!" />
        <p className="text-gray-600 text-center">
          Share your insights, reflect on past experiences, and collaborate with your team to make every project better.
        </p>
        {/* form */}
        <form className="flex flex-col items-center px-3 py-2 bg-gray-100 shadow-none">
          <Tabs defaultValue="guest" className="w-[500px] bg-gray-100 shadow-none">
            <TabsList className="grid w-full grid-cols-3 bg-gray-200 text-gray-800">
              <TabsTrigger value="guest">Guest Mode</TabsTrigger>
              <TabsTrigger value="user">Log In</TabsTrigger>
              <TabsTrigger value="new-user">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="guest">
              <Card className="bg-gray-100">
                <CardHeader>
                  <CardTitle>Greeting Guest</CardTitle>
                  <CardDescription>
                    Add your Full Name here. Click save when you're
                    done to head to the board
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input onChange={(e) => setGuestName(e.target.value)} id="fullname" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={(e) => { HandleGuestLogin(e) }}>Save & Continue</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="user">
              {/* <LoginForm/> */}
              <Card className="bg-gray-100">
                <CardContent className="space-y-2 px-2 py-4">
                  <Heading variant="h2"
                    title="Login will be available soon"
                    extraStyles="font-semibold text-base"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="new-user">
              {/* <SignUpForm/> */}
              <Card className="bg-gray-100">
                <CardContent className="space-y-2 px-2 py-4">
                  <Heading variant="h2"
                    title="Sign up will be available soon"
                    extraStyles="font-semibold text-base"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </section>
  );
};

export default WelcomeAuth;