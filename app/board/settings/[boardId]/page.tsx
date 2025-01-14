"use client";
import Heading from "../../../../components/ui/UI/HeadingComponent/Heading";
import BoardSettings from "../../../../components/ui/UI/Board/BoardSetting/BoardSetting";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/ui/UI/BackButton";
import SessionProvider from "@/app/SessionProvider";
import IBoardData from "@/Interfaces/IBoardData";
import { useMemo, useState } from "react";
import { Loader } from "@/components/ui/UI/Loader/Loader";
import IBoardDataList from "@/Interfaces/IBoardDataList";
import { useAppSelector } from "@/State/stateExports";
import { NotFoundBoardSection } from "@/components/ui/UI/Board/NotFoundBoardSection";

export default function BoardSettingPage({
    params,
}: {
    params: { boardId: string };
}) {
    const [isLoading] = useState<boolean>(false);
    const boardDataList: IBoardDataList = useAppSelector((state) => state.boardState);
    const boardData: IBoardData | undefined = useMemo(
        () => {
            return boardDataList?.BoardDataList?.find(board => board?.boardCode === params?.boardId) ?? undefined
        },
        [boardDataList, params.boardId]
    );

    return (
        <SessionProvider>
            {isLoading && <Loader />}
            {!boardData && <NotFoundBoardSection />}
            {boardData &&
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
                </section>}
        </SessionProvider>
    );
}