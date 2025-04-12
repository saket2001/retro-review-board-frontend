"use client";
import React, { useEffect, useState } from 'react'
// import { BackButton } from '@/components/ui/UI/BackButton'
import Heading from '@/components/ui/UI/HeadingComponent/Heading'
import SearchBoardInput from '@/components/ui/UI/Board/SearchBoard/SearchBoardInput'
import SearchBoardUI from '@/components/ui/UI/Board/SearchBoard/SearchBoardUI'
import IBoardData from '@/Interfaces/IBoardData'
import { useAppDispatch, useAppSelector } from '@/State/stateExports';
import { resetSearchState, updateSearchResult } from '@/State/Slices/SearchBoardSlice';
import { useSearchParams, useRouter } from 'next/navigation';
import SessionProvider from '@/app/SessionProvider';

export default function SearchBoardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetSearch = searchParams.get("reset");
    const dispatch = useAppDispatch();
    const { BoardDataList } = useAppSelector(state => state.searchedBoardsState);
    const [searchBoardDataList, setSearchBoardDataList] = useState<IBoardData[]>(BoardDataList ?? []);

    const callbackHandler = (data: IBoardData[]) => {
        setSearchBoardDataList(data);
        dispatch(updateSearchResult(data));
    }

    //resetting saved search data
    useEffect(() => {
        if (resetSearch === "true") {
            setSearchBoardDataList([]);
            dispatch(resetSearchState());
            /* did these as when came back from board comments page would leave to same route as of initial
            ie board/search-board?isNew=true hence it will delete all saved search result */
            router.push("/board/search-board");
        }
    }, [dispatch, router, resetSearch]);

    return (
        <SessionProvider>
            <main className="flex flex-col px-3 py-2 h-full w-full gap-y-2">
                <section>
                    <div className='flex gap-2 items-center px-2'>
                        {/* <BackButton text="" variant='ghost' extraStyles='text-gray-800' /> */}
                        <Heading title='Search Boards' extraStyles='lg:text-2xl' variant='h1' />
                    </div>
                    <div className='text-white w-full h-full py-3 px-2 my-1'>
                        <SearchBoardInput onFinishedHandler={callbackHandler} />
                        {searchBoardDataList !== undefined && searchBoardDataList.length > 0 && <SearchBoardUI dataList={searchBoardDataList} />}
                    </div>
                </section>
            </main>
        </SessionProvider>
    )
}