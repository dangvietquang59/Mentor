import { SiderType } from '@/app/types/sider';
import Image from 'next/image';

function SiderItem({ icon, title, isSelected, onItemClick }: SiderType) {
    return (
        <div
            className={`my-[2.4rem] flex cursor-pointer flex-col items-center justify-center rounded p-[1rem] transition-colors duration-300 hover:bg-[#b7eb8f] ${isSelected ? 'bg-[#b7eb8f]' : ''}`}
            onClick={onItemClick}
        >
            <Image src={icon} alt={title} />
            <span
                className={`text-[1.2rem] ${isSelected ? 'font-bold text-[#3f6600]' : ''}`}
            >
                {title}
            </span>
        </div>
    );
}

export default SiderItem;
