import { TabType } from '@/app/types/tab';
import Image from 'next/image';

function Tabs({ title, isSelected, onItemClick }: TabType) {
    return (
        <div
            className={`flex cursor-pointer flex-col items-center justify-center border-b-[0.2rem] border-b-transparent duration-300 hover:bg-[#f4ffb8] ${isSelected ? 'border-b-[#5b8c00] text-[#7cb305]' : 'border-b-transparent text-[#6B7B8A]'} transition-all`}
            onClick={onItemClick}
        >
            <span
                className={` p-[1rem] text-[2rem] font-bold hover:text-[#7cb305] `}
            >
                {title}
            </span>
        </div>
    );
}

export default Tabs;
