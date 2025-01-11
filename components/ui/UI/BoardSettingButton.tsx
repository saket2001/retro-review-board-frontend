import React from 'react'
import { SettingIcon } from '../Icons/SettingIcon'
import { Button } from '../MyButton'
import Link from 'next/link'

interface IProps {
    boardCode: string | undefined
}

const BoardSettingButton = (props: IProps) => {
    return (
        <Button className="font-semibold" variant={"ghost"}>
            <Link href={`/board/settings/${props?.boardCode}`}>
                <SettingIcon />
            </Link>
        </Button>
    )
}

export default BoardSettingButton