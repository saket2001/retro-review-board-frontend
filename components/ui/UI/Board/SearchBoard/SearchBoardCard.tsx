import { Button } from "@/components/ui/MyButton";
import IBoardData from "@/Interfaces/IBoardData";
import Link from "next/link";
import React from "react";

interface IPropsType {
    srNo: number;
    BoardData: IBoardData;
}

const SearchBoardCard = (props: IPropsType) => {
    return (
        <div className="px-3 py-4 rounded text-gray-700 bg-white hover:border-l-gray-900 transition-all ease-linear flex items-start border border-l-4 border-l-gray-500">
            <span className="flex flex-col gap-y-1 font-medium">
                <p className="text-lg font-semibold flex items-center">
                    {props?.BoardData?.boardName}
                </p>
                <p className="text-sm flex items-center">
                    Code : {props?.BoardData?.boardCode}
                </p>
                <p className="text-sm flex items-center">
                    Created On : {new Date(props?.BoardData?.createdAt)?.toLocaleString("en-US", { timeZone: "UTC" })}
                </p>
                {/* view button */}
                <Button className="w-fit mt-1">
                    <Link href={`/board/${props?.BoardData?.boardCode}`}>View</Link>
                </Button>
            </span>
        </div>
    );
};

export default SearchBoardCard;
