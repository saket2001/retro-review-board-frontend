import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IBoardData from "@/Interfaces/IBoardData";
import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { deleteBoardDataById } from "@/State/Slices/BoardSlice";
import AxiosHelper from "@/Helpers/AxiosHelper";
import ILoginState from "@/Interfaces/ILoginState";
import { Loader } from "../../Loader/Loader";
import ShareButton from "../../ShareButton";
import Heading from "../../HeadingComponent/Heading";
import { Button } from "@/components/ui/MyButton";
import { useAppDispatch } from "@/State/stateExports";

interface BoardCardProps {
    boardData: IBoardData,
    userData: ILoginState,
    handlePostDeleteAction: () => void;
}

const BoardCard: FunctionComponent<BoardCardProps> = (props) => {
    const dispatch = useAppDispatch();
    const axiosHelper = new AxiosHelper();
    const [isLoading, setIsLoading] = useState(false);

    const handleBoardDelete = async () => {
        try {
            setIsLoading(true)
            const res = await axiosHelper.DeleteReqWithBody("/board/delete", { userId: props.userData?.loggedInUserId, boardId: props.boardData?._id });
            setIsLoading(false)
            if (res?.IsError) {
                toast.error(res?.Message)
            }
            else {
                dispatch(deleteBoardDataById({ BoardId: props.boardData?._id }));
                props.handlePostDeleteAction();
                toast.success(res?.Message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Heading variant="h2" title={props?.boardData?.boardName} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                    <p className="text-gray-800 font-semibold">
                        Code :
                        <span className="text-gray-600 font-semibold"> {props?.boardData?.boardCode ?? ""}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                        Categories :
                        <span className="text-gray-600 font-normal capitalize"> {props?.boardData?.boardCategories}</span>
                    </p>
                    {/* <p className="text-gray-800 font-semibold">
                        Total Comments :
                        <span className="text-gray-600 font-normal"> {props?.boardData?.commentDataList?.length ?? 0}</span>
                    </p> */}
                    <p className="text-gray-800 font-semibold">
                        Comments Masked :
                        <span className="text-gray-600 font-normal"> {props?.boardData?.userCommentsMasked ? "Yes" : "No"}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                        Is Locked :
                        <span className="text-gray-600 font-normal"> {props?.boardData?.isBoardLocked ? "Yes" : "No"}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                        Delete Board Data After :
                        <span className="text-gray-600 font-normal"> {props?.boardData?.deleteBoardDataAfterDays} {+props?.boardData?.deleteBoardDataAfterDays > 1 ? "Days" : " Day"}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                        Created On:
                        <span className="text-gray-600 font-normal"> {new Date(props?.boardData?.createdAt).toLocaleString()}</span>
                    </p>
                    <div className="flex items-center gap-x-3 my-1">
                        <Button className="w-fit">
                            <Link href={`/board/${props?.boardData?.boardCode}`}>View</Link>
                        </Button>
                        <Button onClick={handleBoardDelete} className="w-fit" variant={"destructive"}>
                            Delete
                        </Button>
                        <ShareButton boardId={props?.boardData?.boardCode} />

                        <Button className="font-semibold" variant={"ghost"}>
                            <Link href={`/board/settings/${props.boardData?._id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeW_idth={1.5} stroke="black" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default BoardCard;