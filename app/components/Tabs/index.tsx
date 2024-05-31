'use client';
import { useState } from 'react';
import { TabType } from '@/app/types/tab';

function Tabs({
    arrayTabs,
    onSelectTab,
    className,
}: {
    arrayTabs: TabType[];
    onSelectTab: (index: number) => void;
    className?: string;
}) {
    const [isSelectedTab, setIsSelectedTab] = useState<number>(0);

    const handleSelectedTab = (index: number) => {
        setIsSelectedTab(index);
        onSelectTab(index);
    };

    return (
        <div className="flex">
            {arrayTabs.map((tab, index) => (
                <div
                    key={index}
                    className={`flex cursor-pointer flex-col items-center justify-center border-b-[0.2rem] border-b-transparent duration-300 hover:bg-[#f4ffb8] ${
                        isSelectedTab === index
                            ? 'border-b-[#5b8c00] text-[#7cb305]'
                            : 'border-b-transparent text-[#6B7B8A]'
                    } transition-all`}
                    onClick={() => handleSelectedTab(index)}
                >
                    <span
                        className={`p-[1rem] text-[2rem] font-bold hover:text-[#7cb305] ${className}`}
                    >
                        {tab.title}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Tabs;
