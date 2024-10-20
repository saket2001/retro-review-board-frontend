import { Card, CardHeader } from "../../../card";
import { Button } from "../../../button";
import { Textarea } from "../../../textarea";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import ILoginState from "@/Interfaces/ILoginState";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import IBoardItem from "@/Interfaces/IBoardItem";
import { addBoardDataCommentById, updateBoardDataCommentById } from "@/State/Slices/BoardSlice";
import IBoardData from "@/Interfaces/IBoardData";
import { v4 as uuidv4 } from 'uuid';

interface BoardItemInputProps {
    boardId: string,
    boardItemCategory: string,
    IsItemNew: boolean,
    boardItemData: IBoardItem | null,
    handleEditCommentFn: unknown,
}


const BoardItemInput: FunctionComponent<BoardItemInputProps> = (props) => {
    const dispatch = useDispatch();
    const [userComment, setUserComment] = useState(props?.boardItemData?.comment ?? "");
    const loginData: ILoginState = useSelector((state) => state.loginState);
    // const boardData: IBoardData = useSelector((state) => state.boardState);

    const handleSave = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            //preventing form reload
            e.preventDefault();

            const modifiedComment = userComment?.trim().substring(0, 1).toUpperCase() + userComment?.trim().substring(1, userComment?.length);
            const commentTrimmedLength = modifiedComment.length;

            //checking if input is empty
            if (commentTrimmedLength === 0) {
                throw new Error("Please enter a comment");
            }
            if (commentTrimmedLength > 500) {
                throw new Error("Please enter a comment less than 500 characters long !");
            }

            //create comment object
            const comment: IBoardItem = {
                Id: props.IsItemNew ? uuidv4() : props.boardItemData?.Id,
                comment: modifiedComment,
                commerterName: loginData.loggedInUserName,
                commenterId: loginData?.loggedInUserId,
                category: props.boardItemCategory,
                likes: props.boardItemData?.likes ?? "0",
                createdAt: props.IsItemNew ? new Date().toString() : props.boardItemData?.createdAt,
                updatedAt: new Date().toString(),
            }

            //adding to store
            if (props.IsItemNew)
                dispatch(addBoardDataCommentById({
                    BoardId: props?.boardId,
                    NewComment: comment,
                }));
            else dispatch(updateBoardDataCommentById({
                BoardId: props?.boardId,
                UpdatedComment: comment,
            }));

            //calling api endpoint to save

            //resetting ui input
            setUserComment("");
            if (!props?.IsItemNew) props?.handleEditCommentFn(false);
        }
        catch (error: unknown) {
            console.log(error);
            toast.error(error?.message, { autoClose: 1500 });
        }
    }

    const handleCancel = () => {
        try {
            props.handleEditCommentFn(false);
        } catch (error: unknown) {
            console.log(error);
            toast.error(error?.message, { autoClose: 1500 });
        }
    }

    return (
        <Card className="rounded-md">
            <CardHeader className="w-100">
                <form className="flex flex-col gap-x-3">
                    <Textarea
                        placeholder="Enter your comment here..."
                        name="boardComment"
                        className="my-2"
                        value={userComment}
                        onChange={(e) => { setUserComment(e.target.value) }} />

                    <div className="flex gap-x-4 py-1">
                        <Button onClick={(e) => handleSave(e)} className="w-fit" size={"sm"}>Save</Button>
                        {!props.IsItemNew && <Button variant={"secondary"} onClick={handleCancel} className="w-fit" size={"sm"}>Cancel</Button>}
                    </div>
                </form>
            </CardHeader>
        </Card>
    );
};

export default BoardItemInput;