import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { updateLoginStateData } from '@/State/Slices/LoginSlice';
import { clearBoardData } from '@/State/Slices/BoardSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import ILoginState from '@/Interfaces/ILoginState';

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const loginStateData: ILoginState = useSelector((state) => state.loginState);

    const handleLogOut = async () => {
        try {

            Cookies.remove("login-refresh-token");

            //clear db tokens
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { isGuestUser: loginStateData?.isGuestUser, userId: loginStateData?.loggedInUserId })

            if (res.data?.IsError) {
                toast.error(res.data?.Message)
                return;
            }

            toast.success(res?.data?.Message, { autoClose: 1000 })
            dispatch(updateLoginStateData({}));
            dispatch(clearBoardData());

            router.push("/auth");
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Button>
            <Link href={"/"} onClick={handleLogOut}>Log Out</Link>
        </Button>
    )
}
