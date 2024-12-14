import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import IBoardItem from "@/Interfaces/IBoardItem";
import BoardItemReact from "./BoardItemReact";
import BoardItemDropdown from "./BoardItemDropdown";
import { useState } from "react";
import { toast } from "react-toastify";
import BoardItemInput from "./BoardItemInput";
import ReactMarkdown from 'react-markdown';

interface BoardItem {
    BoardId: string,
    data?: IBoardItem,
    loggedInUserId: string,
    boardItemCategory: string,
    maskUserComments: boolean,
}

const BoardItem = (props: BoardItem) => {
    const [editComment, setEditComment] = useState(false);
    console.log(props.data);

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
                    <ReactMarkdown>
                        {props.data?.comment}
                    </ReactMarkdown>
                    {/* <p dangerouslySetInnerHTML={{ __html: props?.data?.comment }} /> */}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex w-full gap-x-3 items-center justify-between">
                    <div className="flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2 text-base py-1 capitalize font-500 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            {props?.maskUserComments ? 'Guest' : `${props.data?.commerterName}`}
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