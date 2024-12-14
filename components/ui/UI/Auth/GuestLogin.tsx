import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie';
import { Loader } from "../Loader/Loader";

export default function GuestLogin() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [guestName, setGuestName] = useState("");
    const [IsLoading, setIsLoading] = useState(false);

    const HandleGuestLogin = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {

            e.preventDefault();
            if (guestName.length === 0)
                return toast.error("Please enter your full name", { autoClose: 1500 });

            setIsLoading(true)
            //call db to create new user
            const guestData = { isGuest: true, fullName: guestName, userName: "", password: "" }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest-signup`, guestData);

            setIsLoading(false)
            if (res?.data?.IsError) {
                toast.error(res?.data?.Message, { autoClose: 1500 });
                return;
            } else {
                const resultData = res?.data?.Result;
                toast.success(res?.data?.Message, { autoClose: 1500 });

                //handle state management
                dispatch(updateLoginStateData({
                    isLoggedIn: true,
                    loginToken: resultData?.accessToken,
                    loggedInUserId: resultData?.user?.loggedInUserId,
                    loggedInUserName: resultData?.user?.loggedInUserName,
                    loginTokenExpiresIn: "",
                    isGuestUser: true,
                }))

                //storing refresh tokken
                Cookies.set('login-refresh-token', resultData?.refreshToken, { expires: 1, path: '/' });

                //add board id if came from link
                router.push("/board")
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast.error("Something went wrong from our side. Please wait");
        }
    }

    return (<>
        {IsLoading && <Loader />}
        <Card className="bg-gray-100">
            <CardHeader>
                <CardTitle>Greeting Guest</CardTitle>
                Add your Full Name here. Click save when you&apos;re
                done to head to the board
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input className="border border-gray-500" onChange={(e) => setGuestName(e.target.value)} id="fullname" />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={(e) => { HandleGuestLogin(e) }}>Save & Continue</Button>
            </CardFooter>
        </Card >
    </>
    );
}