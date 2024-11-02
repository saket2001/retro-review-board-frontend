"use client";
// import { FunctionComponent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/Components/ui/UI/Heading/Heading";
import LoginForm from "@/components/ui/UI/Auth/Login";
import SignUpForm from "@/components/ui/UI/Auth/SignUp";

import GuestLogin from "@/components/ui/UI/Auth/GuestLogin";

// interface WelcomeAuthProps {}

const WelcomeAuth = () => {



  return (
    <section className="w-full h-full flex items-center justify-center">

      <div className="my-2 lg:my-8 w-3/4 lg:w-1/2 shadow-md flex flex-col items-center px-3 py-2 gap-y-2 lg:p-4 rounded-lg bg-white">
        <Heading variant="h1" title="Welcome to the Retro Review Board!" />
        <p className="text-gray-600 text-center">
          Share your insights, reflect on past experiences, and collaborate with your team to make every project better.
        </p>
        {/* form */}
        <form className="flex flex-col items-center px-3 py-3">
          <Tabs defaultValue="guest" className="w-[500px]">
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
  );
};

export default WelcomeAuth;