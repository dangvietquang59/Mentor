import icons from '@/app/assets/icons';
import Image from 'next/image';

interface ICategoryItemProp {
    nameCategory: string;
}
function CategoryItem({ nameCategory }: ICategoryItemProp) {
    return (
        <div className="flex h-[4rem] cursor-pointer items-center p-[2rem] duration-300 hover:bg-[#d3f261]">
            <Image src={icons.hashTag} alt="hashTag" width={15} height={15} />
            <span className="ml-[2rem] text-[1.6rem] font-semibold text-[#254000]">
                {nameCategory}
            </span>
        </div>
    );
}

export default CategoryItem;
