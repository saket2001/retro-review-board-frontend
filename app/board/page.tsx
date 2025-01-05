"use client";
import IBoardDataList from "../../Interfaces/IBoardDataList";
import ILoginState from "../../Interfaces/ILoginState";
import BoardCard from "../../components/ui/UI/Board/BoardCard/BoardCard";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { createNewBoardDataList } from "@/State/Slices/BoardSlice";
import { Loader } from "@/components/ui/UI/Loader/Loader";
import { toast } from "react-toastify";
import Heading from "@/components/ui/UI/HeadingComponent/Heading";
import { useAppDispatch, useAppSelector } from "@/State/stateExports";
import IBoardData from "@/Interfaces/IBoardData";
import axios from "axios";
import SessionProvider from "../SessionProvider";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/MyButton";
import BoardTableView from "@/components/ui/UI/Board/BoardTableView/BoardTableView";
import RefreshIcon from "@/components/ui/Icons/RefreshIcon";
import useSessionStorageState from 'use-session-storage-state'
import BoardShareInput from "@/components/ui/UI/Board/BoardShareInput/BoardShareInput";

export default function BoardHome() {
    const dispatch = useAppDispatch();
    const loginData: ILoginState = useAppSelector((state) => state.loginState);
    const boardDataList: IBoardDataList = useAppSelector((state) => state.boardState);
    const [boardDataListState, setBoardDataList] = useState<IBoardData[]>(boardDataList?.BoardDataList);
    const [defaultPageView, setDefaultView] = useSessionStorageState("current-view", { defaultValue: "grid" });
    const [currentView, setCurrentView] = useState(defaultPageView);

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["user-boards"],
        queryFn: async () => {
            if (loginData.loggedInUserId?.length > 0) {
                const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/get-all-boards?userId=${loginData.loggedInUserId}`);
                // if (data?.data?.IsError) {
                //     toast.error(data?.data?.Message)
                // }
                return data?.data;
            }
        }
    });

    useEffect(() => {
        dispatch(createNewBoardDataList(data?.Result ?? []))
        setBoardDataList(data?.Result);
    }, [data, dispatch])

    if (error) {
        // toast.error(error?.message)
        console.log(error?.message)
        refetch()
    }

    const handlePostDeleteAction = () => {
        refetch();
    }

    const handlePageView = () => {
        const newView = currentView === "grid" ? "list" : "grid";
        setCurrentView(newView);
        setDefaultView(newView);
    }

    const handleBoardRefresh = () => {
        refetch()
        toast.success("Page refreshed...")
    }

    return (
        <SessionProvider>
            <>
                {isLoading && <Loader />}
                <section className="flex flex-col px-3 py-2 h-full w-full">
                    {/* header */}
                    <section className="flex flex-col gap-3 px-2">
                        <div className="flex justify-between px-1">
                            <Heading title={`Welcome ${loginData.loggedInUserName ?? "User"}`} variant="h1" extraStyles="lg:text-2xl" />
                            <div className="flex flex-col gap-3">
                                <section className="flex gap-x-3">
                                    {/* refresh icon */}
                                    <Button variant={"ghost"} onClick={handleBoardRefresh}>
                                        <RefreshIcon />
                                    </Button>
                                    <div className="flex flex-col">
                                        {/* view options */}
                                        {boardDataListState?.length > 0 && <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button variant={"ghost"} onClick={handlePageView}>
                                                        {currentView === "grid" ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                            </svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                                            </svg>

                                                        }
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {currentView === "grid" ? "Change to list View" : "Change to grid view"}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>}
                                    </div>
                                </section>
                                {boardDataListState?.length > 0 &&
                                    <section>
                                        <Button variant={"ghost"}>Owned By You</Button>
                                    </section>
                                }
                            </div>
                        </div>
                        {(boardDataListState == undefined || boardDataListState?.length === 0) && (
                            <div className="w-full h-full flex flex-col lg:justify-center lg:items-center lg:my-5 lg:py-4">
                                <Heading
                                    title="It looks like you have not created any board or are not part of any board"
                                    variant="h2"
                                    extraStyles="font-medium normal-case"
                                />
                                <p className="text-gray-600">Create one to get started and share it with others</p>
                            </div>
                        )}
                    </section>

                    {/* board views */}
                    {boardDataListState?.length > 0 && (
                        currentView === "grid" ?
                            <section className="grid lg:grid-cols-2 gap-3 lg:gap-x-8 py-4 px-1">
                                {boardDataListState?.map((data) => (
                                    <BoardCard key={data?._id} boardData={data} userData={loginData} handlePostDeleteAction={handlePostDeleteAction} />
                                ))}
                            </section> :
                            <section className="py-4 px-1">
                                <BoardTableView listOfBoards={boardDataListState} />
                            </section>)
                    }

                    {/* board share input */}
                    <div className="fixed z-30 bottom-10 right-16 mr-2">
                        <BoardShareInput />
                    </div>
                </section>
            </>
        </SessionProvider>
    );
}