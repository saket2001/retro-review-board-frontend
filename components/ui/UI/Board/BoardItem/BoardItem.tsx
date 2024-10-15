import { Card, CardDescription, CardFooter, CardHeader } from "../../../card";
import IBoardItem from "@/Interfaces/IBoardItem";
import { Avatar, AvatarFallback } from "../../../avatar";
import BoardItemReact from "./BoardItemReact";
import { Button } from "@/Components/ui/button";
import BoardItemDropdown from "./BoardItemDropdown";

interface BoardItem {
    data?: IBoardItem,
    loggedInUserId: string,
}

const BoardItem = (props: BoardItem) => {

    //logic for displaying commenter's name 
    let avatarName = "";
    const tempArr = props.data?.commerterName.split(" ");
    tempArr?.forEach(d => {
        if (d.length > 1)
            avatarName += d?.substring(0, 1);
    })

    return (
        <Card className="border-t-4 border-t-gray-500 rounded-md" data-id={props.data?.Id}>
            <CardHeader>
                <CardDescription>
                    <p className="text-sm text-gray-800">
                        {props.data?.comment}
                    </p>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex w-full gap-x-3 items-center justify-between">
                    <div className="flex items-center gap-x-3">
                        <Avatar>
                            <AvatarFallback className="bg-gray-500 text-gray-100">
                                {avatarName}
                            </AvatarFallback>
                        </Avatar>
                        <Button variant={"outline"}>
                            <BoardItemReact />
                        </Button>
                    </div>

                    <BoardItemDropdown commentId={props.data?.Id} loggedInUserId={props.loggedInUserId} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default BoardItem;