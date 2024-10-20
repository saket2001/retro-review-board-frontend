"use client";
import BoardList from "@/Components/ui/UI/Board/BoardList/BoardList";
import { Heading } from "@/Components/ui/UI/Heading/Heading";
import { Button } from "@/Components/ui/button";
import IBoardData from "@/Interfaces/IBoardData";
import IBoardDataList from "@/Interfaces/IBoardDataList";
import ILoginState from "@/Interfaces/ILoginState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function BoardDetails({
    params,
}: {
    params: { boardId: string };
}) {
    const router = useRouter();
    const [boardDataState, setBoardDataState] = useState<IBoardData>();
    const [retroBoardTitles, setRetroBoardTitles] = useState<string[]>([]);
    const loginData: ILoginState = useSelector((state) => state.loginState);
    const boardDataList: IBoardDataList = useSelector((state) => state.boardState);

    useEffect(() => {
        //api logic
        setBoardDataState(boardDataList?.BoardDataList?.find(d => d?.Id === params?.boardId));
    }, [boardDataList, params?.boardId])

    // console.log({ boardDataState });

    const canUpdateBoardSetting: boolean = loginData?.loggedInUserId === boardDataState?.ownerUserId;

    if (!loginData.isLoggedIn) {
        router.push("/auth");
        return;
    }

    //if board is locked
    if (boardDataState?.isBoardLocked) {
        toast.info("The board seems to be locked right now by the owner. Please wait !", { autoClose: 1500 });
        return;
    }

    if (boardDataState?.boardCategories && retroBoardTitles.length === 0) {
        setRetroBoardTitles(boardDataState?.boardCategories?.split(","));
    }

    return (
        <section className="flex flex-col px-3 py-2 h-full w-full">
            <section className="flex gap-x-3 justify-between items-center px-2">
                <Heading title={boardDataState?.boardName} variant="h2" extraStyles="font-semibold text-gray-900" />
                <div className="flex items-center gap-x-4">
                    {/* <p className="text-sm font-medium text-gray-700">
                        Saved
                    </p> */}

                    {/* add board id */}
                    {canUpdateBoardSetting &&
                        <div className="flex items-center gap-x-1">
                            <Button className="font-semibold" variant={"ghost"}>
                                <Link href={`/board/settings/${params?.boardId}`} className="ease-in hover:animate-spin">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </Link>
                            </Button>
                            <Button variant={"ghost"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </Button>
                        </div>
                    }

                </div>
            </section>
            {(boardDataState == undefined || boardDataState?.boardName?.length === 0) && (
                <div className="w-full h-full flex justify-center items-center my-5 py-4">
                    <Heading title="There is no board found for given board Id ! Try checking the board Id in url"
                        variant="h3"
                        extraStyles="font-medium"
                    />
                </div>
            )}
            {retroBoardTitles?.length > 0 &&
                <section className="grid lg:grid-cols-3 gap-3 py-4 px-1">
                    {retroBoardTitles?.map((title, i) => (
                        <BoardList
                            key={i}
                            boardId={boardDataState?.Id}
                            extraStyles="rounded-md"
                            listHeading={title}
                            maskUserComments={boardDataState?.userCommentsMasked ?? true}
                            dataList={boardDataState?.commentDataList?.filter(d => d.category?.toLowerCase() === title?.toLowerCase())}
                            loggedInUserId={loginData.loggedInUserId}
                        />
                    ))}
                </section>}
        </section>
    );
}