"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/MyButton";
import { toast } from "react-toastify";
import AxiosHelper from "@/Helpers/AxiosHelper";
import { Loader } from "../../Loader/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import IBoardData from "@/Interfaces/IBoardData";
import { InfoButton } from "../../InfoButton";

interface IPropTypes {
    onFinishedHandler: (data: IBoardData[]) => void;
}

const SearchBoardInput = (props: IPropTypes) => {
    const axiosHelper = new AxiosHelper();
    const [boardCodeInput, setBoardCodeInput] = useState("");
    const [isExactSearch, setIsExactSearch] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const res = await axiosHelper.GetReq(
                `/board/search-board?boardQuery=${boardCodeInput}&isExactSearch=${isExactSearch}`
            );

            setIsLoading(false);
            if (res?.IsError) {
                toast.error(res?.Message);
            } else {
                toast.success(res?.Message);
                props.onFinishedHandler(res?.data ?? []);
            }
        } catch (err: unknown) {
            console.log(err);
            setIsLoading(false);
            toast.error("Something went wrong from our side. Please wait");
        }
    };

    return (
        <>
            {IsLoading && <Loader />}
            <form noValidate onSubmit={(e) => handleFormSubmit(e)}>
                <div className="flex items-start gap-3 relative w-full max-w-full pl-2">
                    <div className="flex flex-col lg:w-1/2 gap-y-1">
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
                        onClick={(e) => handleFormSubmit(e)}
                    >
                        Search
                    </Button>
                </div>
            </form>
        </>
    );
};

SearchBoardInput.propTypes = {};

export default SearchBoardInput;
