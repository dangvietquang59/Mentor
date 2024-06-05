import { SiderType } from '@/app/types/sider';
import Image from 'next/image';

function SiderItem({
    icon,
    activeIcon,
    title,
    isSelected,
    onItemClick,
}: SiderType) {
    return (
        <div
            className={`group my-[2.4rem] flex cursor-pointer flex-col items-center justify-center rounded p-[1rem] transition-colors duration-300`}
            onClick={onItemClick}
        >
            <div
                className={`flex h-[4rem] w-[4rem] transform items-center justify-center rounded-[0.8rem] transition-transform duration-300 hover:scale-110 hover:bg-[#b7eb8f] ${isSelected ? 'bg-[#b7eb8f] text-[#3f6600]' : ''}`}
            >
                <Image src={isSelected ? activeIcon : icon} alt={title} />
            </div>
            <span
                className={`text-[1.4rem] transition-colors duration-300 ${isSelected ? 'font-bold text-[#3f6600]' : 'group-hover:text-[#3f6600]'}`}
            >
                {title}
            </span>
        </div>
    );
}

export default SiderItem;
