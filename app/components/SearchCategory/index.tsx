'use client';
import Image from 'next/image';
import { useState } from 'react';
import Wrapper from '../Wrapper';
import CategoryItem from '../CategoryItem';
import icons from '@/app/assets/icons';

function SearchCategory() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [category, setCategory] = useState<string>('Categories');
    const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

    const handleToggleCategory = () => {
        setIsOpenCategory(!isOpenCategory);
    };
    return (
        <div className="flex h-[5rem] w-[50rem] items-center overflow-hidden rounded-[0.8rem] border-[0.1rem] border-[#ccc] bg-white focus-within:border-[#5b8c00]">
            <div
                className="relative flex cursor-pointer items-center border-r-[0.1rem]"
                onClick={() => handleToggleCategory()}
            >
                <span className="px-[1rem] text-[1.6rem] font-bold text-[#254000]">
                    {category}
                </span>

                <Image
                    src={icons.chevronDown}
                    alt="chevronDown"
                    className={`transition-transform duration-300 ${isOpenCategory ? 'rotate-180' : 'rotate-0'}`}
                />
            </div>
            {isOpenCategory && (
                <Wrapper className="absolute top-[5.5rem] w-[30rem]">
                    <CategoryItem nameCategory="Front-end Developer" />
                    <CategoryItem nameCategory="Back-end Developer" />
                    <CategoryItem nameCategory="Fullstack Developer" />
                </Wrapper>
            )}
            <input
                placeholder="Enter mentor's name"
                className="h-full grow bg-transparent px-[1rem] text-[1.6rem] focus-within:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <div
                    className="h-[1.5rem] w-[1.5rem] cursor-pointer"
                    onClick={() => setSearchQuery('')}
                >
                    <Image src={icons.xCircle} alt="close" />
                </div>
            )}
            <div className="cursor-pointer p-[1rem] hover:opacity-70">
                <Image src={icons.search} alt="search" />
            </div>
        </div>
    );
}

export default SearchCategory;
