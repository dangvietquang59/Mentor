'use client';
import { useState } from 'react';
import NotificationItem from '../NotificationItem';
import Image from 'next/image';
import icons from '@/app/assets/icons';
import Wrapper from '../Wrapper';
import SesionToday from '../SesstionToday';
import ChatUser from '../Chat/ChatUser';
import Link from 'next/link';
import SingleChat from '../SingleChat';

function LoggedIn() {
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [isOpenNotification, setIsOpenNotification] =
        useState<boolean>(false);
    const [isOpenMessage, setIsopenMessage] = useState<boolean>(false);
    const [isOpenSessionToday, setIsOpenSessionToday] =
        useState<boolean>(false);
    const handleToggleSessionToday = () => {
        setIsOpenSessionToday(!isOpenSessionToday);
        setIsOpenNotification(false);
        setIsopenMessage(false);
        setIsOpenInfo(false);
    };
    const handleToggleMessage = () => {
        setIsopenMessage(!isOpenMessage);
        setIsOpenInfo(false);
        setIsOpenNotification(false);
        setIsOpenSessionToday(false);
    };
    const handleToggleInfo = () => {
        setIsOpenInfo(!isOpenInfo);
        setIsopenMessage(false);
        setIsOpenNotification(false);
        setIsOpenSessionToday(false);
    };
    const handleToggleNotification = () => {
        setIsOpenNotification(!isOpenNotification);
        setIsopenMessage(false);
        setIsOpenInfo(false);
        setIsOpenSessionToday(false);
    };
    return (
        <>
            <div
                className="relative mr-[2.4rem] cursor-pointer p-[0.5rem]"
                onClick={() => handleToggleSessionToday()}
            >
                <h2 className="text-[1.6rem] font-bold">Session Today</h2>
            </div>
            {isOpenSessionToday && (
                <Wrapper className="absolute right-[25rem] top-[7rem] w-[40rem]">
                    <SesionToday />
                </Wrapper>
            )}
            <div
                className="relative mr-[2.4rem] cursor-pointer p-[0.5rem]"
                onClick={() => handleToggleMessage()}
            >
                <h2 className="text-[1.6rem] font-bold">Message</h2>
            </div>
            {isOpenMessage && (
                <Wrapper className="absolute right-[12rem] top-[7rem] w-[40rem] p-[1rem]">
                    <h2 className="my-[0.8rem] text-[1.6rem] font-bold">
                        Message
                    </h2>
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ul className="flex h-[3rem] items-center justify-between">
                        <li onClick={() => setIsopenMessage(false)}>
                            <Link href={'/messages'}>
                                <span className="text-[1.4rem] font-bold text-[#7CB305]">
                                    Open all message
                                </span>
                            </Link>
                        </li>
                        <li>
                            <span className="text-[1.4rem] font-bold text-[#7CB305]">
                                Read
                            </span>
                        </li>
                    </ul>
                </Wrapper>
            )}
            <div
                className="relative mr-[2.4rem] cursor-pointer p-[0.5rem]"
                onClick={() => handleToggleNotification()}
            >
                <Image src={icons.bell} alt="bell" />
            </div>
            {isOpenNotification && (
                <Wrapper className="absolute right-[8rem] top-[7rem] w-[40rem] p-[1rem]">
                    <h2 className="my-[0.8rem] text-[1.6rem] font-bold">
                        Notification
                    </h2>
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
                    src="https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008414388.jpg?quality=75&strip=all&w=1024"
                    alt="avatar"
                    className="h-[5rem] w-[5rem] cursor-pointer rounded-full border-[0.2rem] object-cover"
                />
            </picture>
            {isOpenInfo && (
                <Wrapper className="absolute right-0 top-[7rem] w-[25rem] p-[1rem]">
                    <ul>
                        <li className="border-b-[0.1rem] py-[1rem] text-[1.4rem] font-bold text-[#6B7B8A]">
                            @Ryomen Sukuna
                        </li>
                        <Link
                            href={'/profiles'}
                            onClick={() => setIsOpenInfo(false)}
                        >
                            <li className="cursor-pointer rounded-[0.8rem] p-[1rem] text-[1.4rem] font-bold hover:bg-[#b7eb8f]">
                                Profile
                            </li>
                        </Link>
                        <Link
                            href={'signin'}
                            onClick={() => setIsOpenInfo(false)}
                        >
                            <li className="cursor-pointer rounded-[0.8rem] p-[1rem] text-[1.4rem] font-bold hover:bg-[#b7eb8f]">
                                Sign out
                            </li>
                        </Link>
                    </ul>
                </Wrapper>
            )}
        </>
    );
}

export default LoggedIn;
