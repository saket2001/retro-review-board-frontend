"use client";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import BoardSettings from "@/components/ui/UI/Board/BoardSetting/BoardSetting";
import { Heading } from "@/Components/ui/UI/Heading/Heading";
import { useSelector } from "react-redux";

export default function BoardSettingPage() {
    const { boardData } = useSelector(state => state.boardState);
    console.log(boardData);

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
                    <BoardSettings boardData={boardData} isNew={false} />
                </CardContent>
            </Card>
        </section>
    );
}