import React from 'react'
import * as XLSX from 'xlsx';
import { Button } from '@/Components/ui/button'
import IBoardData from '@/Interfaces/IBoardData';
import { toast } from 'react-toastify';
import IBoardItem from '@/Interfaces/IBoardItem';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { marked } from 'marked';

interface downloadIconProps {
    boardData: IBoardData,
    excelFileName: string,
}

interface IBoardDataExcelFormat {
    comment: string,
    commenterName: string,
    boardCategory: string,
    likes: string,
    createdAt: string
}


export const BoardDownloadIcon = (props: downloadIconProps) => {
    const boardData = props?.boardData;

    const processBoardData = (): IBoardDataExcelFormat[] | void => {
        try {

            //validation
            if (boardData == undefined || boardData?.commentDataList.length === 0) {
                throw new Error("No data present for converting to excel!")
            }

            //create a new data array of certain type
            const convertedBoardData: IBoardDataExcelFormat[] = boardData?.commentDataList?.map((data: IBoardItem) => ({
                comment: stripHtmlTags(marked(data.comment?.trim())), // Convert and clean up Markdown
                commenterName: data.commerterName,
                boardCategory: data.category,
                likes: data.likes,
                createdAt: data.createdAt,
            }));

            return convertedBoardData;

        } catch (error) {
            throw error;
        }
    }

    const exportToExcel = () => {
        try {

            // Create a new workbook and worksheet
            const excelData: IBoardDataExcelFormat[] = processBoardData();

            const worksheet = XLSX.utils.json_to_sheet(excelData);

            // Rename headers
            worksheet['A1'].v = 'User Comment';
            worksheet['B1'].v = 'Commenter Name';
            worksheet['C1'].v = 'Category';
            worksheet['D1'].v = 'Total Likes';
            worksheet['E1'].v = 'Date Created';

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

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
        } catch (error) {
            console.log(error);
            toast.error("No data available to export to excel!", { autoClose: 1500 });
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
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button variant={"ghost"} onClick={exportToExcel}>
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
    )
}
