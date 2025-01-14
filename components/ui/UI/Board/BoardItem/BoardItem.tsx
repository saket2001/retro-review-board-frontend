import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import IBoardItem from "@/Interfaces/IBoardItem";
import BoardItemDropdown from "./BoardItemDropdown";
import { useState } from "react";
import BoardItemInput from "./BoardItemInput";
import ReactMarkdown from 'react-markdown';
import { UserLogo } from "@/components/ui/Icons/UserLogo";
import { MaskedCommentIcon } from "@/components/ui/Icons/MaskedCommentIcon";

interface BoardItem {
    BoardId: string | undefined,
    data?: IBoardItem | undefined,
    loggedInUserId: string,
    boardItemCategory: string,
    maskUserComments: boolean,
}

const BoardItem = (props: BoardItem) => {
    const [editComment, setEditComment] = useState(false);

    const handleEditCommentFn = (data: boolean) => {
        setEditComment(data);
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
        <Card className="border-l-4 border-l-gray-400 rounded shadow-sm" data-id={props.data?._id}>
            <CardHeader>
                <CardDescription>
                    {props?.maskUserComments ? <MaskedCommentIcon /> : <ReactMarkdown>
                        {props.data?.comment}
                    </ReactMarkdown>}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex w-full gap-x-3 items-center justify-between">
                    <div className="flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2 text-base py-1 capitalize font-500 text-gray-700">
                            <UserLogo />
                            {props?.maskUserComments ? 'Guest' : `${props.data?.commenterName}`}
                        </div>
                    </div>

                    {props.data?.commenterId === props.loggedInUserId &&
                        <BoardItemDropdown
                            handleEditCommentFn={handleEditCommentFn}
                            BoardId={props?.BoardId}
                            commentId={props.data?._id}
                            loggedInUserId={props.loggedInUserId}
                        />
                    }
                </div>
            </CardFooter>
        </Card>
    );
};

export default BoardItem;