import { Button } from "../../../MyButton";
import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { deleteBoardDataCommentById } from "@/State/Slices/BoardSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/State/stateExports";
import AxiosHelper from "@/Helpers/AxiosHelper";


interface BoardItemDropdownProps {
    BoardId: string,
    commentId: string | undefined,
    loggedInUserId: string,
    handleEditCommentFn: () => void,
}


const BoardItemDropdown: FunctionComponent<BoardItemDropdownProps> = (props) => {
    const dispatch = useAppDispatch();
    const helper = new AxiosHelper();

    const handleCommentDelete = async () => {
        try {
            //call api endpoint
            const bodyData = { boardId: props.BoardId, commentId: props.commentId };
            const res = await helper.PostReq("/board/delete-comment", bodyData);

            if (!res || res?.IsError)
                toast.error(res?.Message ?? "Something went wrong");
            else {
                dispatch(deleteBoardDataCommentById({ BoardId: props?.BoardId, CommentId: props?.commentId }))
                toast.success(res?.Message)
            }

        }
        catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    const handleEditComment = () => {
        try {
            props.handleEditCommentFn(true);
        }
        catch (error) {
            toast.error(error?.message);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"ghost"} className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleEditComment}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCommentDelete}>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>Move To</DropdownMenuItem>
                <DropdownMenuGroup>
                    <DropdownMenuItem>Left</DropdownMenuItem>
                    <DropdownMenuItem>Right</DropdownMenuItem>
                </DropdownMenuGroup> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BoardItemDropdown;