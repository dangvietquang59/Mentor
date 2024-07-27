import icons from '@/assets/icons';
import Image from 'next/image';

function BlogTag() {
    return (
        <div className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] bg-[#999999] px-[1rem] py-[0.5rem]">
            <Image src={icons.hashTag} alt="icon" width={20} />
            <p className="text-[1.6rem]">nameTag</p>
        </div>
    );
}

export default BlogTag;
