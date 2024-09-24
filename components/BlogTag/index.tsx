import icons from '@/assets/icons';
import Image from 'next/image';
import { TagProps } from '../BlogFilter';

function BlogTag({ name }: TagProps) {
    return (
        <div className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] bg-[#3A3B3C] px-[1rem] py-[0.5rem]">
            <Image src={icons.hashTag} alt="icon" width={20} />
            <p className="text-[1.6rem]">{name}</p>
        </div>
    );
}

export default BlogTag;
