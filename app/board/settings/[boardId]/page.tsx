"use client";
import { useSelector } from "react-redux";
import { Heading } from "@/Components/ui/UI/Heading/Heading";
import IBoardDataList from "@/Interfaces/IBoardDataList";
import BoardSettings from "@/components/ui/UI/Board/BoardSetting/BoardSetting";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";

export default function BoardSettingPage({
    params,
}: {
    params: { boardId: string };
}) {
    const boardDataList: IBoardDataList = useSelector((state) => state.boardState);

    return (
        <section className="flex flex-col items-center px-3 py-2">
            <Card className="lg:w-2/3 mx-2">
                <CardHeader>
                    <Heading title="Edit Retro Board" variant="h1" />
                    <CardDescription>
                        Here you can configure your retro board for its behavior and looks.Once done click on save
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BoardSettings
                        boardData={boardDataList?.BoardDataList?.find(d => d.Id === params?.boardId)}
                        isNew={false}
                    />
                </CardContent>
            </Card>
        </section>
    );
}