'use client';
import { useState } from 'react';
import NotificationItem from '../NotificationItem';
import Image from 'next/image';
import icons from '@/assets/icons';
import Wrapper from '../Wrapper';
import SesionToday from '../SesstionToday';
import ChatUser from '../Chat/ChatUser';
import Link from 'next/link';
import SingleChat from '../SingleChat';
import { Avatar } from 'antd';
import paths from '@/utils/constants/paths';

function LoggedIn() {
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [isOpenNotification, setIsOpenNotification] =
        useState<boolean>(false);
    const [isOpenMessage, setIsopenMessage] = useState<boolean>(false);
    const [isOpenSessionToday, setIsOpenSessionToday] =
        useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        name: string;
    } | null>(null);

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
        <div className="flex items-center gap-[1.6rem]">
            <div
                className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]"
                onClick={() => handleToggleSessionToday()}
            >
                <Image src={icons.calendarClock} alt="bell" width={20} />
            </div>
            {isOpenSessionToday && (
                <Wrapper className="absolute right-[25rem] top-[7rem] w-[40rem]">
                    <SesionToday />
                </Wrapper>
            )}
            <div
                className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]"
                onClick={() => handleToggleMessage()}
            >
                <Image src={icons.message} alt="bell" width={20} />
            </div>
            {isOpenMessage && (
                <Wrapper className="absolute right-[12rem] top-[7rem] w-[40rem] p-[1rem]">
                    <h2 className="my-[0.8rem] text-[1.6rem] font-bold">
                        Message
                    </h2>
                    <div
                        onClick={() => {
                            setSelectedUser({ id: '1', name: 'John Doe' });
                            setIsopenMessage(false);
                        }}
                    >
                        <ChatUser />
                    </div>
                    <div
                        onClick={() => {
                            setSelectedUser({ id: '2', name: 'Jane Smith' });
                            setIsopenMessage(false);
                        }}
                    >
                        <ChatUser />
                    </div>
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
                className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]"
                onClick={() => handleToggleNotification()}
            >
                <Image src={icons.bell} alt="bell" width={20} />
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
            <Avatar
                src="https://avatars.githubusercontent.com/u/167729556?v=4"
                className="relative cursor-pointer"
                onClick={() => handleToggleInfo()}
                size={40}
            />
            {isOpenInfo && (
                <Wrapper className="absolute right-0 top-[7rem] w-[25rem] p-[1rem]">
                    <ul>
                        <li className="border-b-[0.1rem] py-[1rem] text-[1.4rem] font-bold text-[#6B7B8A]">
                            @Ryomen Sukuna
                        </li>
                        <Link
                            href={paths.PROFILE}
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
            {selectedUser && (
                <SingleChat
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}

export default LoggedIn;
