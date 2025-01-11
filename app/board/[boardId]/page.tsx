"use client";
import BoardList from "../../../components/ui/UI/Board/BoardList/BoardList";
import IBoardData from "../../../Interfaces/IBoardData";
import ILoginState from "../../../Interfaces/ILoginState";
import { useCallback, useEffect, useMemo, useState } from "react";
import IBoardDataList from "@/Interfaces/IBoardDataList";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/UI/Loader/Loader";
import { addBoardDataCommentById, deleteBoardDataCommentById, updateBoardDataById, updateBoardDataCommentById, updateBoardDataToBoardDataList } from "@/State/Slices/BoardSlice";
import { useAppDispatch, useAppSelector } from "@/State/stateExports";
import SessionProvider from "@/app/SessionProvider";
import ICommentsByBoardTitle from "@/Interfaces/ICommentsByBoardTitle";
import { NotFoundBoardSection } from "@/components/ui/UI/Board/NotFoundBoardSection";
import { BoardLockedSection } from "@/components/ui/UI/Board/BoardLockedSection";
import BoardCommentHeader from "@/components/ui/UI/Board/BoardCommentHeader";
import { socket } from "@/app/page";
import { toast } from "react-toastify";

export default function BoardDetails({
    params,
}: {
    params: { boardId: string };
}) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true)
    const boardDataList: IBoardDataList = useAppSelector((state) => state.boardState);
    const boardData: IBoardData | undefined = useMemo(
        () => {
            setLoading(true);
            return boardDataList?.BoardDataList?.find(board => board?.boardCode === params?.boardId) ?? undefined
            setLoading(false);
        },
        [boardDataList, params.boardId]
    );
    const [retroBoardTitles, setRetroBoardTitles] = useState<string[]>([]);
    const [showBoardLockAlert, setShowBoardLockAlert] = useState(true);
    const [commentsByBoardTitle, setCommentsByBoardTitle] = useState<ICommentsByBoardTitle>({});
    const loginData: ILoginState = useAppSelector((state) => state.loginState);
    const canUpdateBoardSetting: boolean = loginData?.loggedInUserId === boardData?.ownerUserId;

    const { error } = useQuery({
        queryKey: ["board-by-id"],
        queryFn: async () => {
            setLoading(true);
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

    //socket logic
    socket.on('boardUpdate', ({ boardId, data, action }) => {
        if (boardId === boardData?._id) {
            switch (action) {
                case "newCommentAction":
                    dispatch(addBoardDataCommentById({ BoardId: boardId, NewComment: data }));
                    break;
                case "updateCommentAction":
                    dispatch(updateBoardDataCommentById({ BoardId: boardId, UpdatedComment: data }));
                    break;
                case "deleteCommentAction":
                    dispatch(deleteBoardDataCommentById({ BoardId: boardId, CommentId: data }));
                    break;
                case "boardUpdateAction":
                    dispatch(updateBoardDataById({ BoardId: boardId, BoardData: data }));
                    break;
                default:
                    break;

            }
        }
    });

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
        setLoading(false);

    }, [boardData, params.boardId])

    const boardLockClickHandler = useCallback(() => {
        setShowBoardLockAlert(prev => !prev)
    }, [])

    if (loading)
        return <Loader text="Loading Your Board Data, Hold On..." />

    if (error) {
        setLoading(false);
        console.log(error);
    };

    return (
        <SessionProvider>
            <>
                {boardData?.isBoardLocked && showBoardLockAlert && <BoardLockedSection clickHandler={boardLockClickHandler} />}
                <section className="flex flex-col px-3 py-2 h-full w-full">
                    <BoardCommentHeader boardData={boardData} canUpdateBoardSetting={canUpdateBoardSetting} />
                    {retroBoardTitles?.length > 0 && commentsByBoardTitle &&
                        <section className="grid lg:grid-cols-3 gap-y-3 py-4 px-1">
                            {retroBoardTitles?.map((title) => (
                                <BoardList
                                    key={boardData?._id}
                                    boardId={boardData?._id}
                                    extraStyles="rounded-md"
                                    listHeading={title}
                                    maskUserComments={boardData?.userCommentsMasked ?? true}
                                    dataList={commentsByBoardTitle[`${title}`]}
                                    loggedInUserId={loginData.loggedInUserId}
                                    isBoardLocked={boardData?.isBoardLocked ?? false}
                                />
                            ))}
                        </section>
                    }
                </section>
                {/* Wrong Board Section */}
                {!boardData && <NotFoundBoardSection />}
            </>
        </SessionProvider>
    );
}