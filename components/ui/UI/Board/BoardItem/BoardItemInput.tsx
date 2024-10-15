import { Card, CardHeader } from "../../../card";
import { Button } from "../../../button";
import { Textarea } from "../../../textarea";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import ILoginState from "@/Interfaces/ILoginState";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import IBoardItem from "@/Interfaces/IBoardItem";
import { updateBoardDataComment } from "@/State/Slices/BoardSlice";
import IBoardData from "@/Interfaces/IBoardData";
import { v4 as uuidv4 } from 'uuid';

interface BoardItemInputProps {
    boardItemCategory: string,
    IsItemNew: boolean,
    boardItemData: IBoardItem | null,
}


const BoardItemInput: FunctionComponent<BoardItemInputProps> = (props) => {
    const dispatch = useDispatch();
    const [userComment, setUserComment] = useState("");
    const loginData: ILoginState = useSelector((state) => state.loginState);
    const boardData: IBoardData = useSelector((state) => state.boardState);

    const handleSave = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            //preventing form reload
            e.preventDefault();

            //checking if input is empty
            if (userComment?.trim().length === 0) {
                throw new Error("Please enter a comment");
            }

            if (userComment?.trim().length > 500) {
                throw new Error("Please enter a comment less than 500 characters long !");
            }

            //create comment object
            const newUserComment: IBoardItem = {
                Id: uuidv4(),
                comment: userComment,
                commerterName: loginData.loggedInUserName,
                commenterId: loginData?.loggedInUserId,
                category: props.boardItemCategory,
                likes: props.boardItemData?.likes ?? "0",
                createdAt: props.IsItemNew ? new Date().toString() : props.boardItemData?.createdAt,
                updatedAt: new Date().toString(),
            }

            //adding to store
            console.log(boardData.dataList);

            dispatch(updateBoardDataComment(newUserComment));

            //calling api endpoint to save

            //resetting ui input
            setUserComment("");
        }
        catch (error: unknown) {
            toast.error(error?.message);
        }
    }

    return (
        <Card className="rounded-md">
            <CardHeader className="w-100">
                <form className="flex flex-col gap-x-3">
                    <Textarea placeholder="Enter your comment here..." name="boardComment" className="my-2 border-2 border-gray-300" value={userComment} onChange={(e) => { setUserComment(e.target.value) }} />
                    <Button onClick={(e) => handleSave(e)} className="w-fit" size={"sm"}>Save</Button>
                </form>
            </CardHeader>
        </Card>
    );
};

export default BoardItemInput;