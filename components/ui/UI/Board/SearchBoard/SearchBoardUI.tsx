"use client";
import IBoardData from '@/Interfaces/IBoardData'
import React from 'react'
import Heading from '../../HeadingComponent/Heading';
import SearchBoardCard from './SearchBoardCard';

interface IProps {
    dataList: IBoardData[]
}

const SearchBoardUI = (props: IProps) => {
    const boardDataList = props.dataList;

    return (
        <div>
            <div className="flex items-center gap-x-2 my-1 py-1 text-gray-800">
                <Heading title='Search Result' variant='h2' extraStyles='font-semibold' />
                <Heading title={`( Total ${boardDataList.length} items )`} variant='h3' extraStyles='text-sm font-light text-gray-600' />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-4 p-1">
                {boardDataList.map((board, key) => (
                    <SearchBoardCard key={key} srNo={key + 1} BoardData={board} />
                ))}
            </div>
        </div>
    )
}

export default SearchBoardUI