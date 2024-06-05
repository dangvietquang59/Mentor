'use client';
import BookingItem from '@/app/components/BookingItem';
import Tabs from '@/app/components/Tabs';
import { TabType } from '@/app/types/tab';
import { useState } from 'react';

function Booking() {
    const arrayTabs: TabType[] = [
        {
            title: 'Upcoming',
        },
        {
            title: 'Pending',
        },
        {
            title: 'History',
        },
    ];
    const [selectedTab, setSelectedTab] = useState<number>(0);
    return (
        <div className="p-[1rem]">
            <h2 className="mb-[2.4rem] text-[2rem] font-bold">
                Booking sessions
            </h2>
            <div className="border-b-[0.1rem] border-b-[#ccc]">
                <Tabs arrayTabs={arrayTabs} onSelectTab={setSelectedTab} />
            </div>
            {selectedTab === 0 && (
                <div>
                    <BookingItem />
                    <BookingItem />
                    <BookingItem />
                    <BookingItem />
                    <BookingItem />
                </div>
            )}
        </div>
    );
}

export default Booking;
