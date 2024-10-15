import { Card, CardHeader } from "../../../card";
import { Button } from "../../../button";
import { Textarea } from "../../../textarea";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import ILoginState from "@/Interfaces/ILoginState";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import IBoardItem from "@/Interfaces/IBoardItem";
import { deleteBoardDataCommentById, updateBoardDataComment } from "@/State/Slices/BoardSlice";
import IBoardData from "@/Interfaces/IBoardData";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface BoardItemDropdownProps {
    commentId: string | undefined,
    loggedInUserId: string,
}


const BoardItemDropdown: FunctionComponent<BoardItemDropdownProps> = (props) => {
    const dispatch = useDispatch();

    const handleCommentDelete = () => {
        try {
            //get comment id
            //call store to delete it from store
            dispatch(deleteBoardDataCommentById({ Id: props?.commentId }))

            //call api endpoint
        }
        catch (error) {
            toast.error(error?.message);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"secondary"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
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