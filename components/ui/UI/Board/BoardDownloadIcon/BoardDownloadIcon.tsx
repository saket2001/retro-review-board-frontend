import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/MyButton'
import IBoardData from '@/Interfaces/IBoardData';
import { toast } from 'react-toastify';
import IBoardItem from '@/Interfaces/IBoardItem';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { marked } from 'marked';
import { Loader } from '../../Loader/Loader';

interface downloadIconProps {
    boardData: IBoardData | undefined,
    excelFileName: string,
}

interface IBoardDataExcelFormat {
    rowNo: number,
    comment: string,
    commenterName: string,
    boardCategory: string,
    createdAt: string
}


export const BoardDownloadIcon = (props: downloadIconProps) => {
    const boardData = props?.boardData;
    const [isLoading, setIsLoading] = useState(false);

    const ProcessBoardDataCategoryWise = (category: string): IBoardDataExcelFormat[] | void => {
        try {
            //create a new data array of certain type
            const categoryWiseComments = boardData?.commentDataList?.filter(comment => comment.category === category);

            return categoryWiseComments?.map((data: IBoardItem, i) => ({
                rowNo: i + 1,
                commenterName: data.commenterName,
                comment: stripHtmlTags(marked(data.comment?.trim())), // Convert and clean up Markdown
                boardCategory: data.category,
                createdAt: data?.createdAt ? new Date(data.createdAt)?.toLocaleString() : "",
            }));

        } catch (error: unknown) {
            throw error;
        }
    }

    const ExportToExcel = () => {
        try {
            //validation
            if (boardData == undefined || boardData?.commentDataList.length === 0) {
                toast.error("No data present for exporting to excel");
                return;
            }

            if (boardData.userCommentsMasked) {
                toast.error("Please unmask the user comments before exporting to excel")
                return;
            }

            if (boardData) {
                setIsLoading(true);
                //getting board categories
                const boardCategories = boardData.boardCategories.split(",");

                // Create a new workbook and worksheet
                const workbook = XLSX.utils.book_new();

                //adding data into multiple sub sheets
                boardCategories?.forEach((category) => {
                    const excelData: IBoardDataExcelFormat[] | void = ProcessBoardDataCategoryWise(category);

                    //returnng if empty
                    if (!excelData || excelData?.length === 0) return;

                    const worksheet = XLSX.utils.json_to_sheet(excelData);

                    // Rename headers
                    worksheet['A1'].v = 'Sr No';
                    worksheet['B1'].v = 'Commenter Name';
                    worksheet['C1'].v = 'Comment';
                    worksheet['D1'].v = 'Category';
                    worksheet['E1'].v = 'Date Created';

                    XLSX.utils.book_append_sheet(workbook, worksheet, category);
                })

                // Convert workbook to binary and trigger download
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = props?.excelFileName?.length > 0 ? props?.excelFileName : 'export.xlsx';
                link.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                setIsLoading(false);
                toast.success("File downloaded successfully")
            }
        } catch (error) {
            console.log(error);
            return;
        }
    };

    // Helper function to remove HTML tags
    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    return (
        <>
            {isLoading && <Loader />}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant={"ghost"} onClick={ExportToExcel}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Export To Excel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}
