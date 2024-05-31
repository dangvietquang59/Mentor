'use client';
import icons from '@/app/assets/icons';
import logo from '@/app/assets/img/Mentors.png';
import Image from 'next/image';
import { useState } from 'react';
import Wrapper from '../Wrapper';
import CategoryItem from '../CategoryItem';
import NotificationItem from '../NotificationItem';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [category, setCategory] = useState<string>('Categories');
    const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [isOpenNotification, setIsOpenNotification] =
        useState<boolean>(false);

    const handleToggleCategory = () => {
        setIsOpenCategory(!isOpenCategory);
    };
    const handleToggleInfo = () => {
        setIsOpenInfo(!isOpenInfo);
    };
    const handleToggleNotification = () => {
        setIsOpenNotification(!isOpenNotification);
    };
    return (
        <div className="fixed flex h-[8rem] w-full items-center justify-between border-b bg-white p-[1rem]">
            <Image
                src={logo}
                alt="logo"
                className="ml-[1rem] h-[7rem] w-[7rem] rounded-[0.8rem]"
            />
            <div className="flex h-[5rem] w-[50rem] items-center overflow-hidden rounded-[0.8rem] border-[0.1rem] border-[#ccc] focus-within:border-[#5b8c00]">
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
                    <Wrapper className="absolute top-[7rem] w-[30rem]">
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
            <div className="flex items-center">
                <div
                    className="relative mr-[2.4rem] cursor-pointer p-[0.5rem]"
                    onClick={() => handleToggleNotification()}
                >
                    <Image src={icons.bell} alt="bell" />
                </div>
                {isOpenNotification && (
                    <Wrapper className="absolute right-[8rem] top-[7rem] w-[40rem]">
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                        <NotificationItem />
                    </Wrapper>
                )}
                <picture
                    className="relative cursor-pointer"
                    onClick={() => handleToggleInfo()}
                >
                    <img
                        src="https://avatars.githubusercontent.com/u/167729556?v=4"
                        alt="avatar"
                        className="h-[5rem] w-[5rem] cursor-pointer rounded-full border-[0.2rem]"
                    />
                </picture>
                {isOpenInfo && (
                    <Wrapper className="absolute right-0 top-[7rem] w-[25rem]">
                        <div>
                            <p className="h-[4rem] cursor-pointer p-[2rem] text-[1.4rem] leading-[1.4rem] duration-300 hover:bg-[#f4ffb8]">
                                Profile
                            </p>
                            <p className="h-[4rem] cursor-pointer p-[2rem] text-[1.4rem] leading-[1.4rem] duration-300 hover:bg-[#f4ffb8]">
                                Setting
                            </p>
                        </div>
                    </Wrapper>
                )}
            </div>
        </div>
    );
};
export default Header;
