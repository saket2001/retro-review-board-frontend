import { Card, CardHeader } from "@/components/ui/card";
import ILoginState from "@/Interfaces/ILoginState";
import { FunctionComponent, useRef, useState } from "react";
import { toast } from "react-toastify";
import IBoardItem from "@/Interfaces/IBoardItem";
import { addBoardDataCommentById, updateBoardDataCommentById } from "@/State/Slices/BoardSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TurndownService from 'turndown';
import { Button } from "@/components/ui/MyButton";
import { useAppDispatch, useAppSelector } from "@/State/stateExports";
import AxiosHelper from "@/Helpers/AxiosHelper";
import { Loader } from "../../Loader/Loader";


interface BoardItemInputProps {
    boardId: string | undefined,
    boardItemCategory: string,
    IsItemNew: boolean,
    boardItemData: IBoardItem | null,
    handleEditCommentFn: () => void | null,
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
    const [isLoading, setIsLoading] = useState(false);
    const [userComment, setUserComment] = useState(props?.boardItemData?.comment ?? "");
    const loginData: ILoginState = useAppSelector((state) => state.loginState);
    const helper = new AxiosHelper();
    // const boardData: IBoardData = useAppSelector((state) => state.boardState);

    const handleSave = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();

            //converting the html into markdown
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
                _id: props.IsItemNew ? null : props.boardItemData?._id,
                boardId: props?.boardId ?? "",
                comment: modifiedComment,
                commenterName: loginData.loggedInUserName,
                commenterId: loginData?.loggedInUserId,
                category: props.boardItemCategory,
                likes: props.boardItemData?.likes ?? "0",
            }
            setIsLoading(true)
            const res = await helper.PostReq("/board/save-comment", {
                commentData: comment,
            });

            if (!res?.IsError) {
                //adding to store
                if (props.IsItemNew)
                    dispatch(addBoardDataCommentById({
                        BoardId: props?.boardId,
                        NewComment: res?.data,
                    }));

                else
                    dispatch(updateBoardDataCommentById({
                        BoardId: props?.boardId,
                        UpdatedComment: res?.data,
                    }));

                //resetting ui input
                setUserComment("");
                setIsLoading(false)
                toast.success(res?.Message)
            }
            else {
                setIsLoading(false)
                toast.error(res?.Message)
            }

            if (!props?.IsItemNew) props?.handleEditCommentFn(false);
        }
        catch (error: unknown) {
            setIsLoading(false)
            console.log(error);
            toast.error("Something went wrong");
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
        <>
            {isLoading && <Loader text="Saving your comment..." />}
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
                            <Button disabled={isLoading} onClick={(e) => handleSave(e)} className="w-fit" size={"sm"}>Save</Button>
                            {!props.IsItemNew && <Button variant={"secondary"} onClick={handleCancel} className="w-fit" size={"sm"}>Cancel</Button>}
                        </div>
                    </form>
                </CardHeader>
            </Card>
        </>
    );
};

export default BoardItemInput;