"use client";
import BoardList from "@/Components/ui/UI/Board/BoardList/BoardList";
import { Heading } from "@/Components/ui/UI/Heading/Heading";
import { Button } from "@/Components/ui/button";
import IBoardData from "@/Interfaces/IBoardData";
import IBoardItem from "@/Interfaces/IBoardItem";
import ILoginState from "@/Interfaces/ILoginState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const tempBoardListData: IBoardItem[] = [
    {
        Id: 1,
        comment: "sample comment",
        commenterId: 1,
        commerterName: "Saket Chandorkar",
        category: "what went well",
        likes: "0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        Id: 2,
        comment: "sample comment 12",
        commenterId: 1,
        commerterName: "Saket Chandorkar",
        category: "to improve",
        likes: "0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }, {
        Id: 3,
        comment: "sample comment 12212",
        commenterId: 2,
        commerterName: "John Doe",
        category: "to improve",
        likes: "0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// const tempBoardListData: IBoardItem[] = [];

const SampleRetroBoardTitles = {
    "wentwell": "what went well",
    "toimprove": "to improve",
    "whatwentwrong": "what went wrong"
}

export default function Home() {
    const router = useRouter();
    const loginData: ILoginState = useSelector((state) => state.loginState);
    const boardData: IBoardData = useSelector((state) => state.boardState);
    const canUpdateBoardSetting: boolean = loginData?.loggedInUserId === boardData?.ownerUserId;
    const [boardDataState, setBoardData] = useState<IBoardData>(boardData);
    const [retroBoardTitles, setRetroBoardTitles] = useState<string[]>([]);

    if (!loginData.isLoggedIn) {
        router.push("/auth");
        return;
    }

    //if board is locked
    if (boardDataState.isBoardLocked) {
        toast.info("The board seems to be locked right now by the owner. Please wait !")
    }

    if (boardDataState?.boardCategories && retroBoardTitles.length === 0) {
        setRetroBoardTitles(boardData?.boardCategories?.split(","));
    }

    // console.log(boardDataState);

    return (
        <section className="flex flex-col px-3 py-2 h-full w-full">
            <section className="flex gap-x-3 justify-between items-center px-2">
                <Heading title={`Welcome ${loginData.loggedInUserName}`} variant="h1" />
                <div className="flex items-center gap-x-4">
                    <p className="text-sm font-medium text-gray-700">
                        Saved
                    </p>
                    {/* add board id */}
                    {canUpdateBoardSetting && <Button variant={"secondary"}>
                        <Link href={"/board/settings"}>Settings</Link>
                    </Button>}
                </div>
            </section>
            {(boardDataState.boardName == undefined || boardDataState?.boardName?.length === 0) && (
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
                            // extraStyles={i !== retroBoardTitles.length - 1 ? "border-r-2 border-gray-500" : ""}
                            extraStyles="bg-gray-300 rounded-md"
                            listHeading={title}
                            dataList={boardData?.dataList?.filter(d => d.category?.toLowerCase() === title?.toLowerCase())}
                            loggedInUserId={loginData.loggedInUserId}
                        />
                    ))}
                </section>}
        </section>
    );
}