"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ILoginState from "@/Interfaces/ILoginState";
import { useAppSelector } from "@/State/stateExports";
import { LogoutBtn } from "../Auth/LogoutBtn";
import { Button } from "../../MyButton";

interface MenuProps {
    showAuth: boolean,
    toggleMenuHandler?: () => void
}

const linkDivClass = "mx-1 my-2 lg:py-0 py-1 text-center list-none text-base ease-linear hover:text-gray-800 hover:font-medium hover:underline underline-offset-8";

export const ResponsiveNavbar = () => {
    const [menuState, setMenuState] = useState<boolean>(false);
    const [screenSize, setScreenSize] = useState<number>(1820);
    const loginStateData: ILoginState = useAppSelector((state) => state.loginState);

    useEffect(() => {
        const screenSize = window && window.screen.availWidth;
        setScreenSize(screenSize ?? 1820);
    }, [screenSize]);

    const toggleMenuHandler = () => {
        setMenuState((prev) => !prev);
    };

    return (
        <>
            <div className="lg:my-3 lg:mx-3 lg:rounded-full w-100 px-2 py-2 bg-white lg:px-4 flex gap-x-2 justify-between items-center shadow">
                <h1 className="font-bold text-gray-900 mx-2 justify-self-center">
                    <Link href={"/"}>Retro Board</Link>
                </h1>

                {/* large screens */}
                <NavbarLarge showAuth={loginStateData?.isLoggedIn} />

                {/* button */}
                <div className="lg:hidden flex">
                    <button type="button" onClick={toggleMenuHandler}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* small screens */}
            {menuState && screenSize < 900 && (
                <>
                    <div className="lg:hidden w-full h-full py-3 flex flex-col justify-start px-4 z-40 top-0 left-0 absolute bg-gray-200">
                        <NavBarSmall showAuth={loginStateData?.isLoggedIn} toggleMenuHandler={toggleMenuHandler} />
                    </div>
                </>
            )}
        </>
    );
};

const NavbarLarge = (props: MenuProps) => {
    return (
        <>
            <ul className="hidden lg:flex items-center gap-5 px-4">
                <li className={linkDivClass}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                {props?.showAuth && <li className={linkDivClass}>
                    <Link href="/board">
                        Boards
                    </Link>
                </li>}
                {props?.showAuth && <li className={linkDivClass}>
                    <Link href="/board/create-board">
                        Create Board
                    </Link>
                </li>}
                {props.showAuth ? <LogoutBtn /> : <Button>
                    <Link href={"/auth"}>Log In</Link>
                </Button>}
            </ul>
        </>
    );
};

const NavBarSmall = (props: MenuProps) => {

    const toggleMenuHandler = () => {
        if (props.toggleMenuHandler)
            props?.toggleMenuHandler();
    }

    return (
        <div className="flex flex-col py-5 bg-gray-200 gap-y-3">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-gray-900 mx-2 justify-self-center">
                    <Link href={"/"} onClick={toggleMenuHandler}>Retro Board</Link>
                </h1>
                <div className="lg:hidden flex">
                    <button type="button" onClick={() => { props.toggleMenuHandler() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <ul className="flex flex-col gap-y-2 px-4">
                <li className={linkDivClass}>
                    <Link href="/" onClick={toggleMenuHandler}>
                        Home
                    </Link>
                </li>
                {props?.showAuth && <li className={linkDivClass}>
                    <Link href="/board" onClick={toggleMenuHandler}>
                        Boards
                    </Link>
                </li>}
                {props?.showAuth && <li className={linkDivClass}>
                    <Link href="/board/create-board" onClick={toggleMenuHandler}>
                        Create Board
                    </Link>
                </li>}
                {props.showAuth ? <div className="flex justify-center"><LogoutBtn /></div> : <div className="flex justify-center">
                    <Button>
                        <Link href={"/auth"} onClick={toggleMenuHandler}>Log In</Link>
                    </Button>
                </div>}
            </ul>
        </div>
    );
};