import { useState, useEffect, useRef } from 'react';
import { TabType } from '@/types/tab';

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
    const [borderStyle, setBorderStyle] = useState({
        width: '0px',
        left: '0px',
    });
    const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (tabsRef.current[isSelectedTab]) {
            const tab = tabsRef.current[isSelectedTab];
            setBorderStyle({
                width: `${tab!.offsetWidth}px`,
                left: `${tab!.offsetLeft}px`,
            });
        }
    }, [isSelectedTab, arrayTabs]);

    const handleSelectedTab = (index: number) => {
        setIsSelectedTab(index);
        onSelectTab(index);
    };

    return (
        <div className={`relative flex ${className}`}>
            <div
                className="absolute bottom-0 h-[0.2rem] bg-[#5b8c00] transition-all duration-500"
                style={borderStyle}
            />
            {arrayTabs.map((tab, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        tabsRef.current[index] = el;
                    }}
                    className={`flex cursor-pointer flex-col items-center justify-center transition-all duration-300 hover:bg-[#f4ffb8] ${
                        isSelectedTab === index
                            ? 'text-[#7cb305]'
                            : 'text-[#6B7B8A]'
                    }`}
                    onClick={() => handleSelectedTab(index)}
                >
                    <span className="p-[1rem] text-[2rem] font-bold hover:text-[#7cb305]">
                        {tab.title}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Tabs;
