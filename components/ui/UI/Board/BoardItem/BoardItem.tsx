import { Card, CardDescription, CardFooter, CardHeader } from "../../../card";
import IBoardItem from "@/Interfaces/IBoardItem";
import BoardItemReact from "./BoardItemReact";
import { Button } from "@/Components/ui/button";
import BoardItemDropdown from "./BoardItemDropdown";
import { useState } from "react";
import { toast } from "react-toastify";
import BoardItemInput from "./BoardItemInput";

interface BoardItem {
    BoardId: string,
    data?: IBoardItem,
    loggedInUserId: string,
    boardItemCategory: string,
    maskUserComments: boolean,
}

const BoardItem = (props: BoardItem) => {
    const [editComment, setEditComment] = useState(false);

    const handleEditCommentFn = (data: boolean) => {
        try {
            setEditComment(data);
        }
        catch (error) {
            toast.error(error?.message);
        }
    }

    if (editComment) {
        return <BoardItemInput
            handleEditCommentFn={handleEditCommentFn}
            boardItemCategory={props.boardItemCategory}
            boardItemData={props.data}
            IsItemNew={false}
            boardId={props.BoardId} />
    }

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
                        <div className="text-sm px-2 py-1.5 rounded-2xl capitalize text-gray-800">
                            {props.maskUserComments ? '- Guest' : `- ${props.data?.commerterName}`}
                        </div>
                        {/* <Button variant={"ghost"} className="rounded-full">
                            <BoardItemReact />
                        </Button> */}
                    </div>

                    {props.data?.commenterId === props.loggedInUserId &&
                        <BoardItemDropdown
                            handleEditCommentFn={handleEditCommentFn}
                            BoardId={props?.BoardId}
                            commentId={props.data?.Id}
                            loggedInUserId={props.loggedInUserId} />}
                </div>
            </CardFooter>
        </Card>
    );
};

export default BoardItem;