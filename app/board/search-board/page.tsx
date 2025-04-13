"use client";
import React, { useEffect, useRef, useState } from 'react'
// import { BackButton } from '@/components/ui/UI/BackButton'
import Heading from '@/components/ui/UI/HeadingComponent/Heading'
import IBoardData from '@/Interfaces/IBoardData'
import { useAppDispatch, useAppSelector } from '@/State/stateExports';
import { resetSearchState, updateSearchResult } from '@/State/Slices/SearchBoardSlice';
import { useSearchParams, useRouter } from 'next/navigation';
import SessionProvider from '@/app/SessionProvider';
import AxiosHelper from '@/Helpers/AxiosHelper';
import { Loader } from '@/components/ui/UI/Loader/Loader';
import { toast } from 'react-toastify';
import { ForwardArrow } from '@/components/ui/Icons/ForwardArrow';
import { Button } from '@/components/ui/MyButton';
import SearchBoardCard from '@/components/ui/UI/Board/SearchBoard/SearchBoardCard';
import { BackArrow } from '@/components/ui/Icons/BackArrow';
import { Checkbox } from '@/components/ui/checkbox';
import { InfoButton } from '@/components/ui/UI/InfoButton';

export default function SearchBoardPage() {
    const axiosHelper = new AxiosHelper();
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetSearch = searchParams.get("reset");
    const dispatch = useAppDispatch();
    const { BoardDataList } = useAppSelector(state => state.searchedBoardsState);
    const [searchBoardDataList, setSearchBoardDataList] = useState<IBoardData[]>(BoardDataList ?? []);
    const [IsLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [boardCodeInput, setBoardCodeInput] = useState("");
    const [isExactSearch, setIsExactSearch] = useState(false);
    const isFirstLoad = useRef(true);

    const handleFormSubmit = async (e?: React.FormEvent<HTMLFormElement>, isPageChangeSearch: boolean = true) => {
        try {
            e?.preventDefault();
            setIsLoading(true);

            let url = `/board/search-board?boardQuery=${boardCodeInput}&isExactSearch=${isExactSearch}&page=${currentPage}&limit=10`;

            if (!isPageChangeSearch) {
                setCurrentPage(1);
                setTotalPages(1);
                url = `/board/search-board?boardQuery=${boardCodeInput}&isExactSearch=${isExactSearch}&page=1&limit=10`
            }

            const res = await axiosHelper.GetReq(url);

            if (res?.IsError)
                toast.error(res?.Message);
            else {
                // toast.success(res?.Message);
                setSearchBoardDataList(res?.data.data);
                setCurrentPage(res?.data?.currentPage);
                setTotalPages(res?.data?.totalPages);
                isFirstLoad.current = false;
                dispatch(updateSearchResult(res?.data.data));
            }

            setIsLoading(false);

        } catch (err: unknown) {
            console.log(err);
            toast.error("Something went wrong from our side. Please wait");
        }
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

    useEffect(() => {
        if (!isFirstLoad.current) {
            // isFirstLoad.current = false;
            handleFormSubmit();
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);


    return (
        <SessionProvider>
            {IsLoading && <Loader />}
            <main className="flex flex-col px-3 py-2 h-full w-full gap-y-2">
                <section>
                    <div className='flex gap-2 items-center px-2'>
                        {/* <BackButton text="" variant='ghost' extraStyles='text-gray-800' /> */}
                        <Heading title='Search Boards' extraStyles='lg:text-2xl' variant='h1' />
                    </div>
                    <div className='text-white w-full h-full py-3 px-2 my-1'>
                        <form noValidate onSubmit={(e) => handleFormSubmit(e, false)}>
                            <div className="flex items-start gap-3 relative w-full max-w-full pl-2">
                                <div className="flex flex-col w-4/5 lg:w-1/2 gap-y-1">
                                    <input
                                        type="text"
                                        id="search-board-input"
                                        name="search-input"
                                        placeholder="Search Any Board By Code..."
                                        className="text-black px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none shadow-sm placeholder-gray-400 transition"
                                        onChange={(e) => setBoardCodeInput(e.target.value)}
                                        value={boardCodeInput}
                                    />

                                    <span className="flex items-center gap-2 self-start my-1 text-sm text-gray-600 font-medium">
                                        <Checkbox
                                            name="isExactSearch"
                                            onCheckedChange={(checked) => setIsExactSearch(!!checked)}
                                            checked={isExactSearch}
                                        />
                                        <p>Search By Exact Code</p>
                                        <InfoButton
                                            TooltipContent={
                                                <>
                                                    If ticked, finds a board with exact entered board code.
                                                    <br />
                                                    If Unticked, finds any board which has any characters of your
                                                    entered board code.
                                                </>
                                            }
                                        />
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    id="submit-button"
                                    variant={"default"}
                                    onClick={(e) => handleFormSubmit(e, false)}
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                        {searchBoardDataList !== undefined && searchBoardDataList.length > 0 && (
                            <div>
                                <div className="flex justify-between items-center gap-x-2 my-1 py-1 px-2 text-gray-800">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                        <Heading title='Search Result' variant='h2' extraStyles='font-semibold' />
                                        <p className='text-sm text-gray-500'>{`( Total ${searchBoardDataList.length} items )`}</p>
                                    </div>
                                    {/* pagination buttons */}
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                                        <span className="text-sm text-gray-500 self-end lg:self-center pr-1 lg:pr-0">Page {currentPage} of {totalPages}</span>
                                        <div className="flex items-center">
                                            <Button variant={"ghost"} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                                                <BackArrow />
                                            </Button>
                                            <Button variant={"ghost"} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                                                <ForwardArrow />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-4 p-1">
                                    {searchBoardDataList.map((board, key) => (
                                        <SearchBoardCard key={key} srNo={key + 1} BoardData={board} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </SessionProvider>
    )
}