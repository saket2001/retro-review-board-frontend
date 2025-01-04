import React from 'react'
import { toast } from 'react-toastify';
import { Button } from '../MyButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

const ShareButton = (props: { boardId: string | undefined }) => {
    const handleBoardShare = () => {
        try {
            if (props.boardId) {
                navigator?.clipboard?.writeText(`${props.boardId}`)
                toast.success("Share the Board Code copied to your clipboard")
            }
        } catch {
            toast.error("Something went wrong !")
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipContent>
                    <p>Share board code with others</p>
                </TooltipContent>
                <TooltipTrigger>
                    <Button onClick={handleBoardShare} className="w-fit" variant={"ghost"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ShareButton