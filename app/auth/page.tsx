"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Heading from "../../components/ui/UI/HeadingComponent/Heading";
import LoginForm from "../../components/ui/UI/Auth/Login";
import SignUpForm from "../../components/ui/UI/Auth/SignUp";
import GuestLogin from "../../components/ui/UI/Auth/GuestLogin";
import { useAppSelector } from "@/State/stateExports";
import { useRouter } from "next/navigation";
import SessionProvider from "../SessionProvider";

const WelcomeAuth = () => {
  const router = useRouter();
  const userLoginState = useAppSelector(state => state.loginState);

  if (userLoginState?.isLoggedIn) {
    router.replace("/")
  }

  return (
    <SessionProvider>
      <section className="w-full h-full flex items-center justify-center">

        <div className="my-2 lg:my-8 w-full lg:w-1/2 shadow-md flex flex-col items-center px-3 py-2 gap-y-2 lg:p-4 rounded-lg bg-white">
          <Heading variant="h1" title="Welcome to the Retro Review Board" />
          <p className="text-gray-600 text-center">
            Share your insights, reflect on past experiences, and collaborate with your team to make every project better.
          </p>
          {/* form */}
          <form className="flex flex-col items-center px-3 py-3 w-full">
            <Tabs defaultValue="guest" className="w-full md:w-[500px]">
              <TabsList className="grid w-full grid-cols-3 text-gray-800 bg-gray-100 py-1.5">
                <TabsTrigger value="guest">Guest Mode</TabsTrigger>
                <TabsTrigger value="user">Log In</TabsTrigger>
                <TabsTrigger value="new-user">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="guest">
                <GuestLogin />
              </TabsContent>
              <TabsContent value="user">
                <LoginForm />
              </TabsContent>
              <TabsContent value="new-user">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </section>
    </SessionProvider>
  );
};

export default WelcomeAuth;