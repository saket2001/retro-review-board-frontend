import { Button } from "../../../MyButton";
import { useDispatch } from "react-redux";
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


interface BoardItemDropdownProps {
    BoardId: string,
    commentId: string | undefined,
    loggedInUserId: string,
    handleEditCommentFn: unknown,
}


const BoardItemDropdown: FunctionComponent<BoardItemDropdownProps> = (props) => {
    const dispatch = useDispatch();

    const handleCommentDelete = () => {
        try {
            //get comment id
            //call store to delete it from store
            dispatch(deleteBoardDataCommentById({ BoardId: props?.BoardId, CommentId: props?.commentId }))

            //call api endpoint
        }
        catch (error) {
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