import React from 'react'
import { Button } from '../button';
import { toast } from 'react-toastify';

const ShareButton = (props: { boardId: string }) => {
    const handleBoardShare = () => {
        try {
            navigator?.clipboard?.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/board/${props.boardId}`)
            toast.success("Url copied to clipboard")
        } catch {
            toast.error("Something went wrong !")
        }
    }

    return (
        <Button onClick={handleBoardShare} className="w-fit" variant={"ghost"}>
            Share
        </Button>
    )
}

export default ShareButton