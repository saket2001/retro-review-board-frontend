import React from 'react'
import { Button } from '../../MyButton';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { logoutUser } from '@/State/Slices/LoginSlice';
import { clearBoardData } from '@/State/Slices/BoardSlice';
import axios from 'axios';
import { useRouter } from "next/navigation";
import ILoginState from '@/Interfaces/ILoginState';
import { useAppDispatch, useAppSelector } from '@/State/stateExports';

export const LogoutBtn = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const loginStateData: ILoginState = useAppSelector((state) => state.loginState);

    const handleLogOut = async () => {
        try {

            //clear db tokens
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { isGuestUser: loginStateData?.isGuestUser, userId: loginStateData?.loggedInUserId })

            if (res.data?.IsError) {
                toast.error(res.data?.Message)
                return;
            }

            toast.success(res?.data?.Message)
            router.push("/auth");
            dispatch(logoutUser());
            dispatch(clearBoardData());

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    return (
        <Button>
            <Link href={"/"} onClick={handleLogOut}>Log Out</Link>
        </Button>
    )
}
