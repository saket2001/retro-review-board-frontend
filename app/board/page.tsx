"use client";
import { Heading } from "../../Components/ui/UI/Heading/Heading";
import IBoardDataList from "../../Interfaces/IBoardDataList";
import ILoginState from "../../Interfaces/ILoginState";
import BoardCard from "../../components/ui/UI/Board/BoardCard/BoardCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BoardHome() {
    const router = useRouter();
    const loginData: ILoginState = useSelector((state) => state.loginState);
    const boardDataList: IBoardDataList = useSelector((state) => state.boardState);
    const [boardDataListState, setBoardDataList] = useState<IBoardDataList>(boardDataList);

    useEffect(() => {
        setBoardDataList(boardDataList)
    }, [boardDataList])

    if (!loginData.isLoggedIn) {
        router.push("/auth");
        return;
    }

    return (
        <section className="flex flex-col px-3 py-2 h-full w-full">
            <section className="flex gap-x-3 justify-between items-center px-2">
                <Heading title={`Welcome ${loginData.loggedInUserName}`} variant="h1" />
            </section>
            {(boardDataListState == undefined || boardDataListState?.BoardDataList?.length === 0) && (
                <div className="w-full h-full flex flex-col justify-center items-center my-5 py-4">
                    <Heading
                        title="It looks like you have not created any board or are not part of any board"
                        variant="h3"
                        extraStyles="font-medium normal-case"
                    />
                    <Heading
                        title="Create one to get started and share it with others"
                        variant="h3"
                        extraStyles="font-medium normal-case"
                    />
                </div>
            )}
            {boardDataListState?.BoardDataList?.length > 0 &&
                <section className="grid lg:grid-cols-2 gap-3 py-4 px-1">
                    {boardDataListState?.BoardDataList?.map((data) => (
                        <BoardCard key={data?.Id} boardData={data} />
                    ))}
                </section>}
        </section>
    );
}