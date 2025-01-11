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
import BoardSettingButton from "../../BoardSettingButton";

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
                        <BoardSettingButton boardCode={props.boardData?.boardCode} />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default BoardCard;