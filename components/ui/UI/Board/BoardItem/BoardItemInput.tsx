import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import ILoginState from "@/Interfaces/ILoginState";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import IBoardItem from "@/Interfaces/IBoardItem";
import { addBoardDataCommentById, updateBoardDataCommentById } from "@/State/Slices/BoardSlice";
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TurndownService from 'turndown';


interface BoardItemInputProps {
    boardId: string | undefined,
    boardItemCategory: string,
    IsItemNew: boolean,
    boardItemData: IBoardItem | null,
    handleEditCommentFn: unknown,
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
    ],
};


const BoardItemInput: FunctionComponent<BoardItemInputProps> = (props) => {
    const dispatch = useAppDispatch();
    const turndownService = new TurndownService();
    const [userComment, setUserComment] = useState(props?.boardItemData?.comment ?? "");
    const loginData: ILoginState = useAppSelector((state) => state.loginState);
    // const boardData: IBoardData = useAppSelector((state) => state.boardState);

    const handleSave = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            //preventing form reload
            e.preventDefault();

            //converting the html into markdown
            // const modifiedComment: string = userComment?.trim();
            // const modifiedComment = userComment?.trim().substring(0, 1).toUpperCase() + userComment?.trim().substring(1, userComment?.length);
            const modifiedComment: string = turndownService.turndown(userComment?.trim());
            const commentTrimmedLength: number = modifiedComment?.length;


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
            toast.error(error?.message, { autoClose: 1500 });
        }
    }

    const handleCancel = () => {
        try {
            props.handleEditCommentFn(false);
        } catch (error: unknown) {
            toast.error(error?.message, { autoClose: 1500 });
        }
    }

    return (
        <Card className="rounded-md">
            <CardHeader className="w-100 px-4">
                <form className="flex flex-col gap-x-3">
                    <ReactQuill
                        value={userComment}
                        className="my-2"
                        theme="snow"
                        onChange={setUserComment}
                        modules={modules}
                        placeholder="Write your comment here..."
                    />

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