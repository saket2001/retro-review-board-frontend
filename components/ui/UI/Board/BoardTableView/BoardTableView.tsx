"use client"
import { Button } from '@/components/ui/MyButton'
import IBoardData from '@/Interfaces/IBoardData'
import Link from 'next/link'
import React from 'react'
import ShareButton from '../../ShareButton'
import BoardSettingButton from '../../BoardSettingButton'

const boardTableHeadings = ["Sr No", "Title", "Code", "Categries", "Locked", "Comments Masked", "Delete Board After", "Creation Date", "Actions", "", "", ""]

interface IProps {
    listOfBoards: IBoardData[]
}

const BoardTableView: React.FC<IProps> = ({ listOfBoards }) => {

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
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        {boardTableHeadings.map((heading, i) => (
                            <th key={i} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-semibold leading-none text-gray-800">
                                    {heading}
                                </p>
                            </th>
                        )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {listOfBoards && listOfBoards?.length > 0 && listOfBoards?.map((boardData: IBoardData, i) => (
                        <tr key={i}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {i + 1}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {boardData?.boardName}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {boardData?.boardCode}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {boardData?.boardCategories}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {boardData?.isBoardLocked ? "Yes" : "No"}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {boardData?.userCommentsMasked ? "Yes" : "No"}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {boardData?.deleteBoardDataAfterDays} {boardData?.deleteBoardDataAfterDays > 1 ? "Days" : "Day"}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {new Date(boardData?.createdAt).toLocaleString()}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex gap-3">
                                    <Button className="w-fit">
                                        <Link href={`/board/${boardData?.boardCode}`}>View</Link>
                                    </Button>
                                    <Button onClick={handleBoardDelete} className="w-fit" variant={"destructive"}>
                                        Delete
                                    </Button>
                                    <ShareButton boardId={boardData?.boardCode} />
                                    <BoardSettingButton boardCode={boardData?.boardCode} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default BoardTableView