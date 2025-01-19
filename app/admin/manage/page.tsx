"use client";
import SessionProvider from '@/app/SessionProvider'
import ManageQuickSettings from '@/components/ui/UI/Manage/ManageQuickSettings';
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Heading from '@/components/ui/UI/HeadingComponent/Heading';
import ToggleUp from '@/components/ui/Icons/ToggleUp';
import ToggleDown from '@/components/ui/Icons/ToggleDown';
import AllUsersBoardTableView from '@/components/ui/UI/Manage/AllUsersBoardTableView';

const ManagePage = () => {
    const [isQuickSettingOpen, setIsQuickSettingOpen] = useState(false);
    const [isFullViewSettingOpen, setIsFullViewSettingOpen] = useState(false);

    return (
        <SessionProvider>
            <main className='w-full px-3 py-2 flex flex-col gap-3'>
                <Heading variant='h1' title='Manage System' extraStyles='p-1 text-xl' />
                {/* graph section  */}

                {/* Quick settings sections */}
                <Collapsible className='w-full p-4 rounded-2xl bg-white shadow' open={isQuickSettingOpen} onOpenChange={setIsQuickSettingOpen}>
                    <CollapsibleTrigger className='w-full'>
                        <div className="w-full flex justify-between items-center">
                            <Heading variant='h2' title='Quick Deletion' extraStyles='font-semibold text-gray-900' />
                            {isQuickSettingOpen ? <ToggleUp /> : <ToggleDown />}
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <ManageQuickSettings />
                    </CollapsibleContent>
                </Collapsible>

                {/* List view of users and boards */}
                <Collapsible className='w-full p-4 rounded-2xl bg-white shadow'
                    open={isFullViewSettingOpen}
                    onOpenChange={setIsFullViewSettingOpen}>
                    <CollapsibleTrigger className='w-full'>
                        <div className="w-full flex justify-between items-center">
                            <Heading variant='h2' title='Manage All Users & Boards' extraStyles='font-semibold text-gray-900' />
                            {isFullViewSettingOpen ? <ToggleUp /> : <ToggleDown />}
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <AllUsersBoardTableView />
                    </CollapsibleContent>
                </Collapsible>


            </main>
        </SessionProvider>
    )
}

export default ManagePage;