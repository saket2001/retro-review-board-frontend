"use client";
import BoardList from "../../../components/ui/UI/Board/BoardList/BoardList";
import IBoardData from "../../../Interfaces/IBoardData";
import ILoginState from "../../../Interfaces/ILoginState";
import { BoardDownloadIcon } from "../../../components/ui/UI/Board/BoardDownloadIcon/BoardDownloadIcon";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { BackButton } from "@/components/ui/UI/BackButton";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import IBoardDataList from "@/Interfaces/IBoardDataList";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/UI/Loader/Loader";
import { updateBoardDataToBoardDataList } from "@/State/Slices/BoardSlice";
import Heading from "@/components/ui/UI/HeadingComponent/Heading";
import { Button } from "@/components/ui/MyButton";
import { useAppDispatch, useAppSelector } from "@/State/stateExports";
import SessionProvider from "@/app/SessionProvider";
import ICommentsByBoardTitle from "@/Interfaces/ICommentsByBoardTitle";
import ShareButton from "@/components/ui/UI/ShareButton";

// import { io } from 'socket.io-client';
// import ShareButton from "@/components/ui/UI/ShareButton";
// const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
//     withCredentials: true, // Include cookies or other credentials
// });


export default function BoardDetails({
    params,
}: {
    params: { boardId: string };
}) {
    const dispatch = useAppDispatch();
    const boardDataList: IBoardDataList = useAppSelector((state) => state.boardState);

    const boardData = useMemo(
        () => boardDataList?.BoardDataList?.find(board => board?.boardCode === params?.boardId),
        [boardDataList, params.boardId]
    );

    const [IsBoardLocked] = useState(boardData?.isBoardLocked ?? false);
    const [retroBoardTitles, setRetroBoardTitles] = useState<string[]>([]);
    const [showBoardLockAlert, setShowBoardLockAlert] = useState(true);
    const [commentsByBoardTitle, setCommentsByBoardTitle] = useState<ICommentsByBoardTitle>({});
    const loginData: ILoginState = useAppSelector((state) => state.loginState);

    const { error, isLoading } = useQuery({
        queryKey: ["board-by-id"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/get-board-by-id?boardId=${params?.boardId}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();

            const tempData: IBoardData = {
                ...data?.Result?.boardData,
                commentDataList: data?.Result?.commentsArr
            }
            dispatch(updateBoardDataToBoardDataList({ NewBoardData: tempData }));
            return tempData;
        },
    });

    const [loading, setLoading] = useState(isLoading)

    useEffect(() => {
        setLoading(true);

        //creating a state object of comments as per category
        if (boardData && boardData?.boardCategories && boardData?.boardCategories?.length > 0) {
            const commentsByBoardTitleObj: ICommentsByBoardTitle = {};
            const boardTitles = boardData?.boardCategories?.split(",");

            //filtering comments as per category
            boardTitles?.forEach((title) => {
                commentsByBoardTitleObj[`${title}`] = boardData?.commentDataList?.filter(comment => comment?.category?.toLowerCase() == title?.toLowerCase());
            });

            setRetroBoardTitles(boardTitles);
            setCommentsByBoardTitle(commentsByBoardTitleObj);
        }

        //
        // socket.on('newComment', ({ boardId, newComment, commentCategory, action }) => {
        //     console.log(newComment);

        //     if (boardId === params.boardId) {
        //         switch (action) {
        //             case "newCommentAction":
        //                 setCommentsByBoardTitle((prev) => {
        //                     prev[commentCategory].push(newComment);
        //                 })
        //                 break;
        //             case "commentUpdatedAction":
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }
        // });

        setLoading(false);

        // return () => {
        //     socket.off('newComment');
        // };
    }, [boardData, params.boardId])

    // if (loading)
    //     return <Loader text="Loading Your Board Data, Hold On..." />

    if (error) {
        console.log(error);
    };

    const canUpdateBoardSetting: boolean = loginData?.loggedInUserId === boardData?.ownerUserId;

    return (
        <SessionProvider>
            <>
                {loading && <Loader text="Loading Your Board Data, Hold On..." />}
                {(boardData == undefined || boardData?.boardName?.length === 0) && (
                    <div className="w-full h-full flex flex-col justify-center items-center my-5 py-4 gap-2">
                        <Heading
                            title="It looks like you entered wrong board"
                            variant="h1"
                            extraStyles="font-medium"
                        />
                        <Heading
                            title="Please try again by entering correct board code."
                            variant="h3"
                        />
                        <BackButton text="Go Back" />
                    </div>
                )}
                {IsBoardLocked && showBoardLockAlert && <section className="flex justify-center items-center fixed w-full h-full bg-gray-500 top-0 left-0 z-30 bg-opacity-40">
                    <Card className="w-1/2">
                        <CardHeader className="flex justify-center items-center">
                            <Image width="100" height="100" className="w-fit self-center" src="https://img.icons8.com/clouds/100/lock-2.png" alt="lock-2" />
                            <Heading variant="h3" extraStyles="text-gray-800 font-light text-lg my-0" title="The board seems to be locked right now by the owner" />
                            <Heading variant="h3" extraStyles="text-gray-800 font-light text-lg my-0 mb-1" title="Please wait until owner unlocks it or contact the owner to unlock it !" />
                            <Button onClick={() => { setShowBoardLockAlert(prev => !prev) }} variant={"default"}>Ok</Button>
                        </CardHeader>
                    </Card>
                </section>}
                <section className="flex flex-col px-3 py-2 h-full w-full">
                    {boardData && <section className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center px-2">
                        <div className="flex gap-2 items-center">
                            <Heading title={boardData?.boardName ?? ""} variant="h2" extraStyles="font-semibold text-gray-900" />
                            <span className="px-1">
                                {IsBoardLocked ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                }
                            </span>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="flex items-center gap-x-2">
                                <BackButton />
                                {/* setting btn icon */}
                                {canUpdateBoardSetting && <Button className="font-semibold" variant={"ghost"}>
                                    <Link href={`/board/settings/${params?.boardId}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </Link>
                                </Button>}
                                {/* share btn */}
                                <ShareButton boardId={boardData?.boardCode} />
                                {/* Download btn icon */}
                                <BoardDownloadIcon boardData={boardData} excelFileName={`${boardData?.boardName}_export_${new Date().toISOString()}_.xlsx`} />
                            </div>

                        </div>
                    </section>}
                    {retroBoardTitles?.length > 0 &&
                        <section className="grid lg:grid-cols-3 gap-3 py-4 px-1">
                            {retroBoardTitles?.map((title) => (
                                <BoardList
                                    key={boardData?._id}
                                    boardId={boardData?._id}
                                    extraStyles="rounded-md"
                                    listHeading={title}
                                    maskUserComments={boardData?.userCommentsMasked ?? true}
                                    dataList={commentsByBoardTitle[`${title}`]}
                                    loggedInUserId={loginData.loggedInUserId}
                                    isBoardLocked={IsBoardLocked}
                                />
                            ))}
                        </section>}
                </section>
            </>
        </SessionProvider>
    );
}