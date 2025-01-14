"use client";
import IBoardData from '@/Interfaces/IBoardData'
import React from 'react'
import Heading from '../HeadingComponent/Heading'
import { LockIcon } from '../../Icons/LockIcon'
import { UnlockedIcon } from '../../Icons/UnlockedIcon'
import { BackButton } from '../BackButton';
import ShareButton from '../ShareButton';
import BoardSettingButton from '../BoardSettingButton';
import { BoardDownloadIcon } from './BoardDownloadIcon/BoardDownloadIcon';

interface IProps {
    boardData: IBoardData | undefined,
    canUpdateBoardSetting: boolean
}

const BoardCommentHeader = (props: IProps) => {
    let showBoardHeader = true;

    if (!props.boardData)
        showBoardHeader = false;

    return (
        <div>
            {showBoardHeader &&
                <section className="flex flex-col lg:flex-row gap-3 lg:justify-between lg:items-center px-2">
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-y-1">
                            <Heading title={props.boardData?.boardName ?? ""} variant="h2" extraStyles="font-semibold text-gray-900" />
                            <p className="text-base text-gray-500 font-semibold">{props.boardData?.boardCode}</p>
                        </div>
                        <span className="px-1">
                            {props?.boardData?.isBoardLocked ? <LockIcon /> : <UnlockedIcon />}
                        </span>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-x-2">
                            <BackButton />
                            <ShareButton boardId={props.boardData?.boardCode} />
                            {props.canUpdateBoardSetting && <BoardSettingButton boardCode={props?.boardData?.boardCode} />}
                            {!props?.boardData?.isBoardLocked && <BoardDownloadIcon boardData={props.boardData} excelFileName={`${props.boardData?.boardName}_export_${new Date().toISOString()}_.xlsx`} />}
                        </div>
                    </div>
                </section>
            }
        </div>
    );
}

export default BoardCommentHeader