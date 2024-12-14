"use client";
import { Heading } from "../../Components/ui/UI/Heading/Heading";
import ILoginState from "../../Interfaces/ILoginState";
import BoardCard from "../../components/ui/UI/Board/BoardCard/BoardCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from '@tanstack/react-query';
import { createNewBoardDataList } from "@/State/Slices/BoardSlice";
import { Loader } from "@/components/ui/UI/Loader/Loader";
import { toast } from "react-toastify";
import IBoardDataList from "@/Interfaces/IBoardDataList";

export default function BoardHome() {
    const dispatch = useDispatch();
    const router = useRouter();
    const loginData: ILoginState = useSelector((state) => state.loginState);
    const boardDataList: IBoardDataList[] = useSelector((state) => state.boardState);
    const [boardDataListState, setBoardDataList] = useState(boardDataList);

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["user-boards"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/get-all-boards?userId=${loginData.loggedInUserId}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            console.log(data);
            return data;
        }
    });

    useEffect(() => {
        dispatch(createNewBoardDataList(data?.Result ?? []))
        setBoardDataList(data?.Result);
    }, [data, dispatch])

    console.log(boardDataListState);

    if (error) {
        toast.error(error)
    }

    const handlePostDeleteAction = () => {
        refetch();
    }

    if (!loginData.isLoggedIn) {
        router.replace("/auth");
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className="flex flex-col px-3 py-2 h-full w-full">
                <section className="flex flex-col gap-3 px-2">
                    <div>
                        <Heading title={`Welcome ${loginData.loggedInUserName}`} variant="h1" extraStyles="lg:text-2xl" />
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
                {boardDataListState?.length > 0 &&
                    <section className="grid lg:grid-cols-2 gap-3 lg:gap-x-8 py-4 px-1">
                        {boardDataListState?.map((data) => (
                            <BoardCard key={data?._id} boardData={data} userData={loginData} handlePostDeleteAction={handlePostDeleteAction} />
                        ))}
                    </section>}
            </section>
        </>
    );
}