'use client';
import { useState } from 'react';
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
    const profile: UserType = getProfile() || {};

    const logout = () => {
        Cookies.remove(variables.ACCESS_TOKEN);
        router.push(paths.HOME);
        toast.success('Logout successfull');
    };

    const RenderContentUser = () => {
        return (
            <ul className="text-white">
                <li className="mb-[0.8rem] flex flex-col gap-[0.8rem] border-b-[0.1rem] py-[1rem]">
                    <p className="text-[1.4rem] font-bold text-[#6B7B8A]">
                        @{profile?.slug}
                    </p>
                    <div className="flex items-center gap-[0.4rem]">
                        <Image
                            src={images.qCoin}
                            alt="coin"
                            className="size-[3rem]"
                        />
                        <span className="text-[1.4rem] font-bold">
                            {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
                            {formatNumeric(10000000000000)}
                        </span>
                    </div>
                </li>
                <li
                    className="cursor-pointer rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={() => {
                        setIsOpenInfo(false);
                        router.push(`${paths.PROFILE}/${profile?._id}`);
                    }}
                >
                    Profile
                </li>
                <li
                    className="cursor-pointer rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={logout}
                >
                    Sign out
                </li>
            </ul>
        );
    };

    const RenderChat = () => {
        return (
            <div className="text-white">
                <h2 className="my-[0.8rem] text-[1.6rem] font-bold">Message</h2>
                <div
                    onClick={() => {
                        setSelectedUser({ id: '1', name: 'John Doe' });
                        setIsopenMessage(false);
                    }}
                >
                    {/* <ChatUser /> */}
                </div>
                <div
                    onClick={() => {
                        setSelectedUser({
                            id: '2',
                            name: 'Jane Smith',
                        });
                        setIsopenMessage(false);
                    }}
                >
                    {/* <ChatUser /> */}
                </div>
                <ul className="flex h-[3rem] items-center justify-between">
                    <li onClick={() => setIsopenMessage(false)}>
                        <Link href={`${paths.MESSAGES}/${profile?._id}`}>
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
            </div>
        );
    };

    const RenderNotification = () => {
        return (
            <div className="text-white">
                <h2 className="my-[0.8rem] text-[1.6rem] font-bold">
                    Notification
                </h2>
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
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
                </div>
            </Popover>

            <Popover
                content={<RenderContentUser />}
                trigger="click"
                open={isOpenInfo}
                onOpenChange={() => setIsOpenInfo(!isOpenInfo)}
                overlayStyle={{ width: '20rem' }}
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
