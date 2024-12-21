"use client"
import { Button } from '@/components/ui/MyButton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import IBoardData from '@/Interfaces/IBoardData'
import Link from 'next/link'
import React from 'react'
import ShareButton from '../../ShareButton'

const boardTableHeadings = ["Sr No", "Title", "Categries", "Locked", "Comments Masked", "Creation Date", "Actions", "", "", ""]

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
                                    {new Date(boardData?.createdAt).toLocaleString()}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Button className="w-fit">
                                    <Link href={`/board/${boardData?._id}`}>View</Link>
                                </Button>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50"> <Button onClick={handleBoardDelete} className="w-fit" variant={"destructive"}>
                                Delete
                            </Button></td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <ShareButton boardId={boardData?._id} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Share with others</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Button className="font-semibold" variant={"ghost"}>
                                    <Link href={`/board/settings/${boardData?._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeW_idth={1.5} stroke="black" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default BoardTableView