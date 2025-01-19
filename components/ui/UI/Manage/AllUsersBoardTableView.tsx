"use client"
import { Button } from '@/components/ui/MyButton'
import AxiosHelper from '@/Helpers/AxiosHelper'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from '../Loader/Loader'
import { useRouter } from 'next/navigation'
import Heading from '../HeadingComponent/Heading'

const boardTableHeadings = ["Sr No", "Full Name", "User Name", "Is Guest", "Boards Created", "Action"]

const AllUsersBoardTableView = () => {
    const router = useRouter();
    const helper = new AxiosHelper();
    const [loading, setLoading] = useState(false);
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin-manage-data"],
        queryFn: async () => {
            const res = await helper.GetReq(`/manage/get-all-users-and-boards`);
            return res?.data;
        },
        staleTime: 3000,
    });

    if (error) {
        console.log(error);
        toast.error("Something went wrong")
    }

    const handleDelete = async (userId: string) => {
        try {
            setLoading(true);
            const res = await helper.DeleteReq(`/manage/delete-all-user-data?userId=${userId}`);

            setLoading(false);
            if (res?.IsError) {
                toast.error(res?.Message)
            }
            else {
                toast.success(res?.Message);
                router.refresh();
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            {loading || isLoading && <Loader />}
            {data && data?.length > 0 && <div className="relative flex flex-col p-2 my-2 w-full h-full overflow-scroll text-gray-700 bg-gray-100 shadow-md rounded-xl bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            {boardTableHeadings.map((heading, i) => (
                                <th key={i} className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-semibold leading-none text-gray-800">
                                        {heading}
                                    </p>
                                </th>
                            )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((d, i) => (
                            <tr key={i}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {i + 1}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {d?.fullName}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {d?.userName}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {d?.isGuest ? "Yes" : "No"}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        {d?.boardCount}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex gap-3">
                                        <Button onClick={() => { handleDelete(d?._id) }} className="w-fit" variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            {data && data?.length === 0 && <Heading variant='h2' title='No Data found' extraStyles='py-2' />}
        </>
    )
}

export default AllUsersBoardTableView;