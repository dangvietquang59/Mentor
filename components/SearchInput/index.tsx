import icons from '@/assets/icons';
import Image from 'next/image';

function SearchInput() {
    return (
        <div className="my-[2.4rem] flex h-[4rem] items-center rounded-[0.8rem] border border-[#ccc] p-[1rem]">
            <Image src={icons.search} alt="icon" />
            <input
                placeholder="Enter name user"
                className="h-full grow bg-transparent p-[1rem] text-[1.4rem] focus-within:outline-none"
            />
        </div>
    );
}

export default SearchInput;
