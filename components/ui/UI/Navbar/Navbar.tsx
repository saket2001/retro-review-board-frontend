"use client";
import { FunctionComponent } from "react";
import { Button } from "../../button";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import ILoginState from "@/Interfaces/ILoginState";
import { LogoutBtn } from "../Auth/LogoutBtn";

interface Props {

}

const Navbar: FunctionComponent<Props> = () => {
    const loginStateData: ILoginState = useSelector((state) => state.loginState);

    return (
        <nav className="lg:my-3 lg:mx-3 lg:rounded-full w-100 px-2 py-2 bg-white lg:px-4 flex gap-x-2 justify-between items-center shadow">
            <h1 className="font-bold text-gray-900 mx-2 justify-self-center">
                <Link href={"/"}>Retro Board</Link>
            </h1>

            <div className="mx-3 flex items-center justify-evenly gap-x-5">
                <Button variant={"link"} className="px-0">
                    <Link href={"/"}>Home</Link>
                </Button>
                {loginStateData.isLoggedIn && <Button variant={"link"} className="px-0">
                    <Link href={"/board"}>My Boards</Link>
                </Button>}
                {loginStateData.isLoggedIn && <Button variant={"link"} className="px-0">
                    <Link href={"/board/create-board"}>Create Board</Link>
                </Button>}
                {loginStateData.isLoggedIn ? <LogoutBtn /> : <Button>
                    <Link href={"/auth"}>Log In</Link>
                </Button>}
            </div>
        </nav>
    );
}

export default Navbar;