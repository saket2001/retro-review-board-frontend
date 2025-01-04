import React, { useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/MyButton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const BoardShareInput = () => {
    const router = useRouter();
    const inputRef = useRef(null);

    const handleInputSubmit = useCallback(() => {
        const codeEntered = inputRef.current?.value;
        console.log(codeEntered);

        if (!codeEntered) {
            toast.error("Please enter a valid board code")
            return;
        }

        router.replace(`/board/${codeEntered}`)

    }, [router])


    return (
        <Popover >
            <PopoverTrigger>
                <Button>Add Board Code</Button>
            </PopoverTrigger>
            <PopoverContent className='w-60 shadow-md'>
                <div className="flex flex-col gap-y-4">
                    <p className='text-sm text-gray-700'>
                        Enter the code shared with you to go to that board
                    </p>
                    <Input ref={inputRef} placeholder='6 digit code..' />
                    <Button className='w-fit' onClick={handleInputSubmit}>Go</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default BoardShareInput