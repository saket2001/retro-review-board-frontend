
import { BackButton } from "@/components/ui/UI/BackButton";
import { Card, CardContent, CardDescription, CardHeader } from "../../../components/ui/card";
import BoardSettings from "../../../components/ui/UI/Board/BoardSetting/BoardSetting";
import Heading from "../../../components/ui/UI/HeadingComponent/Heading";

export default function CreateBoardPage() {

    return (
        <section className="flex flex-col items-center px-3 py-2 gap-3">
            <div className="w-100 self-start flex justify-start"><BackButton /></div>
            <Card className="lg:w-2/3 mx-2">
                <CardHeader>
                    <Heading title="Create New Retro Board" variant="h1" />
                    <CardDescription>
                        Here you can configure your retro board for its behavior and looks. You will be the owner of the board and can change the setting anytime.
                        Once done click on save so you will be logged in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BoardSettings isNew={true} />
                </CardContent>
            </Card>
        </section>
    );
}