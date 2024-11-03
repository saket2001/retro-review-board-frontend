"use client";

import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/MyButton";
import { FunctionComponent, MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../../State/stateExports";
import { addBoardDataToBoardDataList, updateBoardDataById } from "@/State/Slices/BoardSlice";
import { updateLoginStateData } from "@/State/Slices/LoginSlice";
import IBoardData from "@/Interfaces/IBoardData";
import ILoginState from "@/Interfaces/ILoginState";
import { v4 as uuidv4 } from 'uuid';

const BoardItemSchecma = z.object({
    Id: z.string(),
    comment: z.string(),
    commenterId: z.string(),
    commerterName: z.string(),
    category: z.string(),
    likes: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

const BoardSettingSchecma = z.object({
    Id: z.string().optional(),
    boardName: z
        .string()
        .default(`Retro Board ${new Date().toDateString()}`),
    ownerUserId: z.string().optional(),
    ownerName: z
        .string({ message: "Your full name field is required!" })
        .min(3, "Your Full Name must contain atleast 3 characters long!")
        .max(50, "Your Full Name must contain atmost 50 characters long!"),
    boardCategories: z.string({ message: "Retro Board Categoies is required!" }),
    userCommentsMasked: z.boolean().optional(),
    isBoardLocked: z.boolean().optional(),
    commentDataList: z.array(BoardItemSchecma).optional(),
    createdAt: z.string().default(new Date().toString())
});

// type IBoardSetting = z.infer<typeof BoardSettingSchecma>;

interface BoardSettingsProps {
    boardData?: IBoardData
    isNew: boolean
}

const BoardSettings: FunctionComponent<BoardSettingsProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const loginStateData: ILoginState = useAppSelector(state => state.loginState);
    const [commentsMasked, setCommentsMasked] = useState(props.boardData?.userCommentsMasked);
    const [boardLocked, setBoardLocked] = useState(props.boardData?.isBoardLocked);

    if (props.isNew) {
        props.boardData = {
            Id: uuidv4(),
            boardName: `Retro Board ${new Date().toDateString()}`,
            ownerUserId: loginStateData.loggedInUserId,
            boardCategories: "What Went Well 👌,To Improve 😊,Went Wrong 😢",
            userCommentsMasked: false,
            isBoardLocked: false,
            commentDataList: [],
            createdAt: new Date().toString(),
        };
    }

    const [boardData, setBoardData] = useState(props.boardData);
    const [boardErrors, setBoardErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();

            const arr = boardData?.boardCategories.trim().split(",");
            if (boardData?.boardCategories.length === 0 || (arr.length === 0 || arr.length > 3))
                return setBoardErrors((prev) => ({ ...prev, boardCategories: "Retro Board Categories can have upto 3 categories only" }));

            // validatedData.boardId = uuidv4();
            const validatedData = BoardSettingSchecma.parse(boardData);
            validatedData.ownerUserId = loginStateData.loggedInUserId;
            validatedData.commentDataList = props.isNew ? [] : props?.boardData?.commentDataList;
            validatedData.userCommentsMasked = commentsMasked;
            validatedData.isBoardLocked = boardLocked;

            setBoardData(validatedData);
            setBoardErrors({});

            toast.success(`Board ${props.isNew ? "Created" : "Updated"} Successfully!`, {
                autoClose: 1500,
            });

            //save data logic
            if (props.isNew)
                dispatch(addBoardDataToBoardDataList({ NewBoardData: validatedData }))
            else
                dispatch(updateBoardDataById({
                    BoardId: validatedData.Id,
                    BoardData: validatedData,
                }))

            //login the user if not did already
            if (!loginStateData.isLoggedIn) {
                dispatch(updateLoginStateData({
                    isLoggedIn: true,
                    loginToken: "",
                    loggedInUserId: validatedData.ownerUserId,
                    loggedInUserName: validatedData.ownerName,
                    loginTokenExpiresIn: "",
                }))
            }

            setTimeout(() => router.push("/board"), 2000);
        } catch (err) {
            const validationErrors = err?.flatten().fieldErrors;
            setBoardErrors(validationErrors);
        }
    };

    //TODO need to implement
    const handleFormShare = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    };

    return (
        <form className="flex flex-col gap-y-4 w-full">
            {/* will be auto generated */}
            <div className="flex flex-col w-50 gap-y-2">
                <Label>Board Unique Number</Label>
                <div className="flex gap-x-4 items-center">
                    <Input
                        type="text"
                        disabled
                        name="boardId"
                        value={boardData?.Id}
                        className="w-2/3"
                    ></Input>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    onClick={(e) => {
                                        handleFormShare(e);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5 ease-in transition-all hover:scale-105"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                        />
                                    </svg>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Share with others</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="flex flex-col w-50 gap-y-2">
                <Label>
                    Retro Board Name
                    <span className="text-gray-600 text-xs px-1 font-medium">
                        (Optional)
                    </span>
                </Label>
                <Input
                    type="text"
                    name="boardName"
                    className="w-2/3"
                    value={boardData?.boardName}
                    onChange={handleChange}
                ></Input>
            </div>
            <div className="flex flex-col w-50 gap-y-2">
                <Label>Your Full Name</Label>
                <Input
                    type="text"
                    name="ownerName"
                    className="w-2/3"
                    value={boardData?.ownerName}
                    onChange={handleChange}
                ></Input>
                {boardErrors?.ownerName && (
                    <p className="text-red-600 text-sm font-medium">
                        {boardErrors?.ownerName}
                    </p>
                )}
            </div>
            <div className="flex flex-col w-50 gap-y-2">
                <Label>
                    Retro Board Categories
                    <span className="text-gray-600 text-xs px-1 font-medium">
                        (Add comma separated headings. Max only 3)
                    </span>
                </Label>
                <Input
                    type="text"
                    name="boardCategories"
                    className="w-2/3"
                    onChange={handleChange}
                    value={boardData?.boardCategories}
                ></Input>
                {boardErrors.boardCategories && (
                    <p className="text-red-600 text-sm font-medium">
                        {boardErrors?.boardCategories}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-x-3">
                <Checkbox
                    name="userCommentsMasked"
                    onCheckedChange={(checked) => setCommentsMasked(!!checked)}
                    checked={commentsMasked}
                />
                {/* <Checkbox name="userCommentsMasked" onChange={(e) => setCommentsMasked(e)} value={boardData?.userCommentsMasked} /> */}
                <p className="font-medium text-base">
                    Mask User Comments
                    <span className="text-gray-600 text-xs px-1 font-medium">
                        (No one will be able to see others comments added in realtime)
                    </span>
                </p>
            </div>
            <div className="flex items-center gap-x-3">
                <Checkbox
                    name="isBoardLocked"
                    onCheckedChange={(checked) => setBoardLocked(!!checked)}
                    checked={boardLocked}
                />
                {/* <Checkbox name="isBoardLocked" onChange={(e) => setBoardLocked(e.target.checked)} value={boardData?.isBoardLocked} /> */}
                <p className="font-medium text-base">
                    Lock Board for all commenters
                    <span className="text-gray-600 text-xs px-1 font-medium">
                        (No one will be able to add comments henceforth)
                    </span>
                </p>
            </div>
            <Button
                variant={"default"}
                type="submit"
                onClick={(e) => handleFormSubmit(e)}
            >
                Save
            </Button>
        </form>
    );
};

export default BoardSettings;
