"use client";
import Heading from "../../../../components/ui/UI/HeadingComponent/Heading";
import BoardSettings from "../../../../components/ui/UI/Board/BoardSetting/BoardSetting";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/ui/UI/BackButton";
import SessionProvider from "@/app/SessionProvider";
import { useQueryClient } from "@tanstack/react-query";
import IBoardData from "@/Interfaces/IBoardData";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/UI/Loader/Loader";

interface ICachedData {
    IsError: boolean,
    Message: string,
    Result: IBoardData[]
}

export default function BoardSettingPage({
    params,
}: {
    params: { boardId: string };
}) {
    const queryClient = useQueryClient();
    const [boardData, setBoardData] = useState<IBoardData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cachedBoardsData: ICachedData | undefined = queryClient.getQueryData(["user-boards"]);

    useEffect(() => {
        if (cachedBoardsData !== undefined) {
            setIsLoading(true)
            const arr = cachedBoardsData?.Result;
            setBoardData(arr?.find(board => board.boardCode === params?.boardId))
        }
        setIsLoading(false)
    }, [params.boardId, cachedBoardsData])


    return (
        <SessionProvider>
            {isLoading && <Loader />}
            <section className="flex flex-col justify-start items-center px-3 py-2 gap-y-2">
                <div className="w-100 self-start flex justify-start px-1">
                    <BackButton />
                </div>
                <Card className="lg:w-2/3 mx-2">
                    <CardHeader>
                        <Heading title="Edit Retro Board" variant="h1" />
                        <CardDescription>
                            Here you can configure your retro board for its behavior and looks.Once done click on save
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BoardSettings
                            boardData={boardData}
                            isNew={false}
                        />
                    </CardContent>
                </Card>
            </section>
        </SessionProvider>
    );
}