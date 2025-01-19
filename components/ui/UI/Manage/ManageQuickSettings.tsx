"use client";
import React from 'react'
import { Button } from '../../MyButton';
import { Separator } from '../../separator';
import { toast } from 'react-toastify';
import AxiosHelper from '@/Helpers/AxiosHelper';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../Loader/Loader';
import { useRouter } from 'next/navigation';

const baseDivClassName = 'flex flex-col gap-x-4 gap-y-3 items-start text-base';
const baseSpanClassName = 'text-gray-600 text-sm font-500';

const deleteActionWiseUrl = {
    deleteallrefreshtokens: "/manage/delete-all-refresh-tokens",
    deleteallguestusers: "/manage/delete-guest-and-tokens",
    deleteallguestboards: "/manage/delete-all-guest-boards",
    deleteallusers: "/manage/delete-users-and-tokens",
    deletealluserboards: "/manage/delete-all-user-boards",
    deleteallboards: "/manage/delete-all-boards",
    deleteallexpiredboards: "/manage/delete-all-expired-boards",
    deletealldata: "/manage/delete-all-data"
}

// interface IProps {
//     systemData: {
//         totalRefreshTokens: number,
//         totalGuestUsers: number,
//         totalUsers: number,
//         totalGuestBoards: number,
//         totalUsersBoards: number,
//         totalExpiredBoards: number,
//         totalComments: number,
//     };
// }

const ManageQuickSettings = () => {
    const helper = new AxiosHelper();
    const router = useRouter();
    const { data, isLoading, error } = useQuery({
        queryKey: ["admin-manage-data"],
        queryFn: async () => {
            const res = await helper.GetReq(`/manage/get-all-system-info`);
            return res?.data;
        },
        staleTime: 3000,
    });

    if (error) {
        console.log(error);
        toast.error("Something went wrong")
    }

    const deleteHandlerActionWise = async (actionName: string) => {
        const res = await helper.DeleteReq(deleteActionWiseUrl[actionName?.toString()] ?? "")

        if (res && res?.IsError) {
            console.log(res.Message);
            toast.error(res.Message);
        } else if (res) {
            toast.success(res.Message);
            router.refresh();
        }

    }

    return (
        <>
            {isLoading && <Loader />}
            <section className='p-3 lg:p-6 flex flex-col gap-3 bg-white text-gray-800 shadow rounded-2xl'>
                <div className="lg:grid lg:grid-cols-2 lg:grid-flow-row gap-y-3 gap-x-5 flex flex-col">
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Remove all guest users from the system.
                            <span className={baseSpanClassName}>( Total present in the system - {data?.totalGuestUsers} )</span>
                        </p>
                        <Button onClick={() => deleteHandlerActionWise("deleteallguestusers")}>Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Remove all users from the system.
                            <span className={baseSpanClassName}>( Total present in the system - {data?.totalUsers} )</span>
                        </p>
                        <Button onClick={() => deleteHandlerActionWise("deleteallusers")}>Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Remove all guest users board from the system.
                            <span className={baseSpanClassName}>
                                ( Total present in the system - {data?.totalGuestBoards} )
                            </span>
                        </p>
                        <Button>Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Remove all users board from the system.
                            <span className={baseSpanClassName}>
                                ( Total present in the system - {data?.totalUsersBoards} )
                            </span>
                        </p>
                        <Button>Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Remove all guests & users boards from the system which are expired i.e their delete days after days is past creation date
                            <span className={baseSpanClassName}>
                                ( Total present in the system - {data?.totalExpiredBoards} )</span>
                        </p>
                        <Button onClick={() => { deleteHandlerActionWise("deleteallexpiredboards") }} >Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Remove all guest & users refresh tokens
                            <span className={baseSpanClassName}>
                                ( Total present in the system - {data?.totalRefreshTokens} )</span>
                        </p>
                        <Button onClick={() => { deleteHandlerActionWise("deleteallrefreshtokens") }}>Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Delete all guests and users from the system
                            <span className={baseSpanClassName}>
                                ( Total present in the system - {data?.totalUsers + data?.totalGuestUsers} )</span>
                        </p>
                        <Button onClick={() => { deleteHandlerActionWise("deletealldata") }} variant={"destructive"}>Delete</Button>
                        <Separator />
                    </div>
                    <div className={baseDivClassName}>
                        <p className='flex flex-col'>
                            Delete all boards
                            <span className={baseSpanClassName}>
                                ( Total present in the system - {data?.totalUsersBoards + data?.totalGuestBoards} )</span>
                        </p>
                        <Button onClick={() => { deleteHandlerActionWise("deleteallboards") }} variant={"destructive"}>Delete</Button>
                        <Separator />

                    </div>
                </div>
            </section>
        </>
    );
}

export default ManageQuickSettings;