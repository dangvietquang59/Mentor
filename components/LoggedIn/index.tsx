'use client';
import { useEffect, useState } from 'react';
import NotificationItem from '../NotificationItem';
import Image from 'next/image';
import icons from '@/assets/icons';
import SesionToday from '../SesstionToday';
import Link from 'next/link';
import SingleChat from '../SingleChat';
import { Avatar, Popover } from 'antd';
import paths from '@/utils/constants/paths';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import variables from '@/utils/constants/variables';
import { toast } from 'sonner';
import images from '@/assets/img';
import { getProfile } from '@/utils/functions/getProfile';
import { UserType } from '@/types/user';
import { formatNumeric } from '@/utils/functions/formatNumeric';
import ChatUser from '../Chat/ChatUser';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import groupChatApi from '@/apis/groupChatApi';
import { GroupChatResponseType } from '@/types/response/groupChat';
import notificationApi from '@/apis/notificationApi';
import { NotificationType } from '@/types/response/notification';

function LoggedIn() {
    const router = useRouter();
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
    const [notis, setNotis] = useState<NotificationType[]>([]);
    const [countRead, setCountRead] = useState<number>(0);
    const profile: UserType = getProfile() || {};
    const [groups, setGroups] = useState<GroupChatResponseType[]>([]);

    const logout = () => {
        Cookies.remove(variables.ACCESS_TOKEN);
        Cookies.remove(variables.PROFILE);
        router.push(paths.HOME);
        toast.success('Logout successfull');
    };
    const accessToken = getAccessTokenClient();
    useEffect(() => {
        const fetchNotification = async () => {
            if (accessToken && profile?._id) {
                try {
                    const res = await notificationApi.getByUserId(
                        profile._id,
                        accessToken,
                    );
                    if (res) {
                        setNotis(res?.notifications);
                        setCountRead(res?.unreadCount);
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotification();

        const intervalId = setInterval(
            () => {
                fetchNotification();
            },
            1 * 6 * 10000,
        );

        return () => clearInterval(intervalId);
    }, [profile?._id]);
    useEffect(() => {
        const fetchChatGroup = async () => {
            if (accessToken && profile?._id) {
                try {
                    const res = await groupChatApi.getById(
                        accessToken,
                        profile._id,
                    );
                    if (res) {
                        setGroups(res);
                    }
                } catch (error) {
                    console.error('Error fetching chat groups:', error);
                }
            }
        };

        fetchChatGroup();
    }, [accessToken]);

    const RenderContentUser = () => {
        return (
            <ul className="text-white">
                <li className="mb-[0.8rem] flex flex-col gap-[0.8rem] border-b-[0.1rem] p-[1rem]">
                    <p className="text-[1.4rem] font-bold text-[#6B7B8A]">
                        @{profile?.slug}
                    </p>
                    <div className="flex items-center gap-[0.8rem]">
                        <Image
                            src={images.qCoin}
                            alt="coin"
                            className="size-[3rem]"
                        />
                        <span className="text-[1.4rem] font-bold">
                            {formatNumeric(profile?.coin) || 0}
                        </span>
                    </div>
                </li>
                <li
                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={() => {
                        setIsOpenInfo(false);
                        router.push(`${paths.BOOKINGS}/${profile?._id}`);
                    }}
                >
                    <Image src={icons.clock} alt="icon-log-out" />
                    Your bookings
                </li>
                <li
                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={() => {
                        setIsOpenInfo(false);
                        router.push(`${paths.PROFILE}/${profile?._id}`);
                    }}
                >
                    <Image src={icons.User} alt="icon-log-out" />
                    Your profile
                </li>
                <li
                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={logout}
                >
                    <Image src={icons.logOut} alt="icon-log-out" />
                    <p>Sign out</p>
                </li>
            </ul>
        );
    };

    const RenderChat = () => {
        return (
            <div className="text-white">
                <h2 className="my-[0.8rem] text-[1.6rem] font-bold">Message</h2>

                <ChatUser userId={profile?._id} groups={groups} />

                <ul className="flex h-[3rem] items-center justify-between">
                    <li onClick={() => setIsopenMessage(false)}>
                        <Link href={`${paths.MESSAGES}/${profile?._id}`}>
                            <span className="text-[1.4rem] font-bold text-[#5DD62C]">
                                Open all message
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const RenderNotification = () => {
        return (
            <div className="text-white">
                <h2 className="my-[0.8rem] text-[1.6rem] font-bold">
                    Notification
                </h2>
                <div className="flex flex-col gap-[0.8rem]">
                    {notis.length > 0 &&
                        notis.map((item, index) => (
                            <NotificationItem noti={item} key={index} />
                        ))}
                </div>
            </div>
        );
    };
    return (
        <div className="flex items-center gap-[1.6rem]">
            <Popover
                content={<SesionToday />}
                trigger="click"
                open={isOpenSessionToday}
                onOpenChange={() => setIsOpenSessionToday(!isOpenSessionToday)}
                overlayStyle={{ width: '40rem' }}
            >
                <div className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]">
                    <Image src={icons.calendarClock} alt="bell" width={20} />
                </div>
            </Popover>
            <Popover
                content={<RenderChat />}
                trigger="click"
                open={isOpenMessage}
                onOpenChange={() => setIsopenMessage(!isOpenMessage)}
                overlayStyle={{ width: '40rem' }}
            >
                <div className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]">
                    <Image src={icons.message} alt="bell" width={20} />
                </div>
            </Popover>
            <Popover
                content={<RenderNotification />}
                trigger="click"
                open={isOpenNotification}
                onOpenChange={() => setIsOpenNotification(!isOpenNotification)}
                overlayStyle={{ width: '40rem' }}
            >
                <div className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]">
                    <Image src={icons.bell} alt="bell" width={20} />
                    {countRead > 0 && (
                        <p className="absolute left-[2.6rem] top-[-0.6rem] flex size-[2rem] items-center justify-center rounded-full bg-red-500 text-center text-[1.2rem]">
                            {countRead}
                        </p>
                    )}
                </div>
            </Popover>

            <Popover
                content={<RenderContentUser />}
                trigger="click"
                open={isOpenInfo}
                onOpenChange={() => setIsOpenInfo(!isOpenInfo)}
                overlayStyle={{ width: '25rem' }}
            >
                {profile ? (
                    <Avatar
                        src={profile?.imageUrl}
                        className="relative cursor-pointer"
                        size={40}
                    />
                ) : (
                    <Avatar
                        src={
                            <Image
                                src={images.defaultAvatar}
                                alt="Default Avatar"
                            />
                        }
                        className="relative cursor-pointer"
                        size={40}
                    />
                )}
            </Popover>

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
