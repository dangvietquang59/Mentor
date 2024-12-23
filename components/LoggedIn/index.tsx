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
import ModalCoin from '@/components/ModalCoin';
import authApi from '@/apis/authApi';
import userApi from '@/apis/userApi';
import { useUserStore } from '@/stores/useAuthStore';

function LoggedIn() {
    const router = useRouter();
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [isOpenNotification, setIsOpenNotification] =
        useState<boolean>(false);
    // const [isOpenMessage, setIsopenMessage] = useState<boolean>(false);
    const [isOpenSessionToday, setIsOpenSessionToday] =
        useState<boolean>(false);
    const [isOpenCoin, setOpenCoin] = useState<boolean>(false);
    // const [selectedUser, setSelectedUser] = useState<{
    //     id: string;
    //     name: string;
    // } | null>(null);
    const [openModalCoin, setOpenModalCoin] = useState(false);
    const [me, setMe] = useState<UserType>();
    const [notis, setNotis] = useState<NotificationType[]>([]);
    const [countRead, setCountRead] = useState<number>(0);
    const profile: UserType = getProfile() || {};
    const [groups, setGroups] = useState<GroupChatResponseType[]>([]);
    const accessToken = getAccessTokenClient();
    const { logout: logoutFunction, user, setUser } = useUserStore();
    const fetchMe = async () => {
        if (accessToken) {
            await userApi
                .getMe(accessToken)
                .then((res) => {
                    if (res) {
                        setMe(res);
                        setUser(res);
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    useEffect(() => {
        fetchMe();
    }, []);
    const logout = () => {
        Cookies.remove(variables.ACCESS_TOKEN);
        Cookies.remove(variables.PROFILE);
        router.push(paths.HOME);
        toast.success('Đăng xuất thành công');
        logoutFunction();
    };
    const showModalCoin = () => {
        setOpenModalCoin(true);
    };
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
    useEffect(() => {
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
                <li
                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={() => {
                        setIsOpenInfo(false);
                        router.push(`${paths.BOOKINGS}/${profile?._id}`);
                    }}
                >
                    <Image src={icons.clock} alt="icon-log-out" />
                    Lịch đặt
                </li>
                <li
                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={() => {
                        setIsOpenInfo(false);
                        router.push(`${paths.PROFILE}/${profile?._id}`);
                    }}
                >
                    <Image src={icons.User} alt="icon-log-out" />
                    Cá nhân
                </li>
                <li
                    className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] text-[1.6rem] font-normal duration-300 hover:bg-[#0F0F0F]"
                    onClick={logout}
                >
                    <Image src={icons.logOut} alt="icon-log-out" />
                    <p>Đăng xuất</p>
                </li>
            </ul>
        );
    };

    // const RenderChat = () => {
    //     return (
    //         <div className="text-white">
    //             <h2 className="my-[0.8rem] text-[1.6rem] font-bold">Message</h2>

    //             {groups?.length > 0 ? (
    //                 <>
    //                     <ChatUser userId={profile?._id} groups={groups} />

    //                     <ul className="flex h-[3rem] items-center justify-between">
    //                         <li onClick={() => setIsopenMessage(false)}>
    //                             <Link
    //                                 href={`${paths.MESSAGES}/${profile?._id}`}
    //                             >
    //                                 <span className="text-[1.4rem] font-bold text-[#5DD62C]">
    //                                     Open all message
    //                                 </span>
    //                             </Link>
    //                         </li>
    //                     </ul>
    //                 </>
    //             ) : (
    //                 <div className="flex items-center justify-center">
    //                     <p className="text-[1.6rem] font-medium">
    //                         No messages groups found
    //                     </p>
    //                 </div>
    //             )}
    //         </div>
    //     );
    // };

    const RenderNotification = () => {
        return (
            <div className="max-h-[50rem] overflow-y-auto text-white">
                <h2 className="my-[0.8rem] text-[1.6rem] font-bold">
                    Thông báo
                </h2>
                <div className="flex flex-col gap-[0.8rem]">
                    {notis.length > 0 ? (
                        notis.map((item, index) => (
                            <NotificationItem
                                noti={item}
                                key={index}
                                onClose={() =>
                                    setIsOpenNotification(!isOpenNotification)
                                }
                                mutate={fetchNotification}
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center">
                            <p className="text-[1.6rem] font-medium">
                                Bạn chưa có thông báo
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    const RenderCoinInfo = () => {
        return (
            <ul className="flex flex-col gap-[1.2rem] text-white">
                <li>
                    <button
                        className="flex w-full items-center gap-[1.6rem]"
                        onClick={showModalCoin}
                    >
                        <Image src={icons.plus} alt="icon" width={16} />
                        <p>Nạp tiền</p>
                    </button>
                </li>
                {/* <li>
                    <button
                        className="flex w-full items-center gap-[1.6rem]"
                        onClick={showModalCoin}
                    >
                        <Image src={icons.minus} alt="icon" width={16} />
                        <p>Rút tiền</p>
                    </button>
                </li> */}
            </ul>
        );
    };
    return (
        <>
            <div className="flex items-center gap-[1.6rem]">
                <Popover
                    content={<RenderCoinInfo />}
                    trigger="click"
                    open={isOpenCoin}
                    onOpenChange={() => setOpenCoin(!isOpenCoin)}
                    overlayStyle={{ width: '15rem' }}
                >
                    <button className="flex min-w-[15rem] items-center justify-between gap-[1.4rem] rounded-[0.8rem] bg-[#363636] p-[0.5rem_1rem]">
                        <div className="flex items-center gap-[0.8rem]">
                            <Image
                                src={images.qCoin}
                                alt="coin"
                                className="size-[3rem]"
                            />
                            <span className="text-[1.4rem] font-bold">
                                {formatNumeric(
                                    user?.coin || me?.coin || profile?.coin,
                                ) || 0}
                            </span>
                        </div>
                        <Image
                            src={icons.chevronDown}
                            alt="icons"
                            className={`size-[2rem] ${isOpenCoin ? 'rotate-180' : 'rotate-0'} duration-300`}
                        />
                    </button>
                </Popover>
                <Popover
                    content={<SesionToday />}
                    trigger="click"
                    open={isOpenSessionToday}
                    onOpenChange={() =>
                        setIsOpenSessionToday(!isOpenSessionToday)
                    }
                    overlayStyle={{ width: '40rem' }}
                >
                    <div className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]">
                        <Image
                            src={icons.calendarClock}
                            alt="bell"
                            width={20}
                        />
                    </div>
                </Popover>
                {/* <Popover
                    content={<RenderChat />}
                    trigger="click"
                    open={isOpenMessage}
                    onOpenChange={() => setIsopenMessage(!isOpenMessage)}
                    overlayStyle={{ width: '40rem' }}
                >
                    <div className="relative cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)] p-[1rem]">
                        <Image src={icons.message} alt="bell" width={20} />
                    </div>
                </Popover> */}
                <Popover
                    content={<RenderNotification />}
                    trigger="click"
                    open={isOpenNotification}
                    onOpenChange={() =>
                        setIsOpenNotification(!isOpenNotification)
                    }
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
                    {user ? (
                        <Avatar
                            src={user?.imageUrl}
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

                {/* {selectedUser && (
                    <SingleChat
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                    />
                )} */}
            </div>
            <ModalCoin
                open={openModalCoin}
                handleCancel={() => {
                    setOpenModalCoin(false);
                    setOpenCoin(false);
                }}
                handleOk={() => setOpenModalCoin(true)}
            />
        </>
    );
}

export default LoggedIn;
