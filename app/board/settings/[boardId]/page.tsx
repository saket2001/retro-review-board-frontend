"use client";
import { useAppSelector } from "../../../../State/stateExports";
import Heading from "../../../../components/ui/UI/HeadingComponent/Heading";
import IBoardDataList from "../../../../Interfaces/IBoardDataList";
import BoardSettings from "../../../../components/ui/UI/Board/BoardSetting/BoardSetting";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/ui/UI/BackButton";

export default function BoardSettingPage({
    params,
}: {
    params: { boardId: string };
}) {
    const boardDataList: IBoardDataList = useAppSelector((state) => state.boardState);

    return (
        <section className="flex flex-col justify-start items-center px-3 py-2 gap-y-2">
            <div className="w-100 self-start flex justify-start px-1"><BackButton /></div>
            <Card className="lg:w-2/3 mx-2">
                <CardHeader>
                    <Heading title="Edit Retro Board" variant="h1" />
                    <CardDescription>
                        Here you can configure your retro board for its behavior and looks.Once done click on save
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BoardSettings
                        boardData={boardDataList?.BoardDataList?.find(d => d._id === params?.boardId)}
                        isNew={false}
                    />
                </CardContent>
            </Card>
        </section>
    );
}