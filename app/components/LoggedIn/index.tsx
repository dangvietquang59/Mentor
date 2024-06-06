'use client';
import { useState } from 'react';
import NotificationItem from '../NotificationItem';
import Image from 'next/image';
import icons from '@/app/assets/icons';
import Wrapper from '../Wrapper';

function LoggedIn() {
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [isOpenNotification, setIsOpenNotification] =
        useState<boolean>(false);
    const [isOpenMessage, setIsopenMessage] = useState<boolean>(false);

    const handleToggleMessage = () => {
        setIsopenMessage(!isOpenMessage);
        setIsOpenInfo(false);
        setIsOpenNotification(false);
    };
    const handleToggleInfo = () => {
        setIsOpenInfo(!isOpenInfo);
        setIsopenMessage(false);
        setIsOpenNotification(false);
    };
    const handleToggleNotification = () => {
        setIsOpenNotification(!isOpenNotification);
        setIsopenMessage(false);
        setIsOpenInfo(false);
    };
    return (
        <>
            <div
                className="relative mr-[2.4rem] cursor-pointer p-[0.5rem]"
                onClick={() => handleToggleMessage()}
            >
                <Image src={icons.message} alt="bell" />
            </div>
            {isOpenMessage && (
                <Wrapper className="absolute right-[12rem] top-[7rem] w-[40rem]">
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </Wrapper>
            )}
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
        </>
    );
}

export default LoggedIn;
