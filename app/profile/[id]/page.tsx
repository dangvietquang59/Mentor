'use client';
import Image from 'next/image';
import icons from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { TabType } from '../../../types/tab';
import Tabs from '../../../components/Tabs';
import BookingTime from '../../../components/BookingTime';
import { Avatar, Tooltip } from 'antd';
import images from '@/assets/img';
import { useMounted } from '@/utils/hooks/useMounted';
import { usePathname, useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';
import authApi from '@/apis/authApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { UserType } from '@/types/user';
import { getProfile } from '@/utils/functions/getProfile';
import ExperienceTag from '@/components/ExperienceTag';
import groupChatApi from '@/apis/groupChatApi';
import reviewApi from '@/apis/reviewApi';
import { ReviewType } from '@/types/response/review';
import ReviewCard from '@/components/ReviewCard';
import { useChatStore } from '@/stores/useChatStore';
import { useRoomStore } from '@/stores/useRoomStore';
import { formatNumeric } from '@/utils/functions/formatNumeric';

function Profiles() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const mounted = useMounted();
    const router = useRouter();
    const pathname = usePathname();
    const profile: UserType = getProfile();
    const profileId = pathname.split(`${paths.PROFILE}/`)[1];
    const [profileUser, setProfileUser] = useState<UserType | null | undefined>(
        null,
    );
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const accessToken = getAccessTokenClient() || '';

    useEffect(() => {
        if (profileId) {
            const fetchProfile = async () => {
                await authApi
                    .getProfile(profileId, accessToken)
                    .then((res) => {
                        setProfileUser(res);
                    })
                    .catch((error) => {
                        console.error('Error fetching profile:', error);
                    });
            };
            fetchProfile();
        }
        const fetchReviews = async () => {
            await reviewApi
                .getByUserId(profileId, accessToken)
                .then((res) => {
                    if (res) {
                        setReviews(res?.reviews);
                    }
                })
                .catch((errors) => console.log(errors));
        };
        fetchReviews();
    }, [profileId]);

    const arrayTabs: TabType[] =
        profile?._id !== profileId
            ? [
                  {
                      title: 'Tổng quan',
                  },
                  {
                      title: 'Đánh giá từ người học',
                  },
              ]
            : [];
    const { toggleChat } = useChatStore();
    const { setSelectedRoom } = useRoomStore();

    const handleCreateChatOneVOne = async () => {
        if (profileUser && profile) {
            const dataChat = {
                name: profileUser?.fullName,
                members: [profileUser?._id, profile?._id],
            };

            try {
                const res = await groupChatApi.getById(
                    accessToken,
                    profile?._id,
                );
                if (res) {
                    const room = res?.find((item) =>
                        item?.members?.some(
                            (member) => member?._id === profileUser?._id,
                        ),
                    );

                    if (room) {
                        toggleChat();
                        setSelectedRoom(room);
                    } else {
                        const createdRoom = await groupChatApi.create(
                            dataChat,
                            accessToken,
                        );
                        if (createdRoom) {
                            toggleChat();
                            setSelectedRoom(createdRoom);
                        }
                    }
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra hoặc tạo phòng chat:', error);
            }
        }
    };

    return (
        <>
            {mounted && (
                <div className="min-h-[120rem] w-full p-[2rem]">
                    <div className="h-[15rem] bg-gradient-to-r from-[#355429] to-[#5dd62c]"></div>
                    <div className="flex min-h-[12rem] bg-[#242526]">
                        <div className="relative ml-[10rem] w-[15rem]">
                            {profileUser ? (
                                <Avatar
                                    src={profileUser?.imageUrl}
                                    size={150}
                                    className="absolute top-[-5rem] border-[0.3rem] border-white"
                                />
                            ) : (
                                <Avatar
                                    src={
                                        <Image
                                            src={images.defaultAvatar}
                                            alt="avatar"
                                        />
                                    }
                                    size={150}
                                    className="absolute top-[-5rem] border-[0.3rem] border-white"
                                />
                            )}
                        </div>
                        <div className="ml-[1.5rem] flex h-[10rem] grow items-center justify-between">
                            <div>
                                <p className="text-[2rem] font-bold">
                                    {profileUser?.fullName}
                                </p>
                                <span className="text-[1.6rem] font-bold text-[#6b7b8a]">
                                    {profileUser?.bio?.name}
                                </span>
                            </div>
                            {profile?._id === profileId ? (
                                <div className="flex items-center gap-[1.2rem] px-[2rem]">
                                    <button
                                        className="flex items-center gap-[1.6rem] rounded-[0.8rem] border border-[#5DD52C] p-[10px_20px]"
                                        onClick={() =>
                                            router.push(
                                                `${paths.PROFILE}/${paths.EDIT}/${profileUser?._id}`,
                                            )
                                        }
                                    >
                                        <Image src={icons.editPen} alt="icon" />
                                        <p className="text-[1.6rem] text-[#5DD52C]">
                                            Chỉnh sửa
                                        </p>
                                    </button>
                                </div>
                            ) : (
                                <div className="px-[2rem]">
                                    <Tooltip title="Gửi tin nhắn">
                                        <button
                                            className="flex items-center gap-[1.6rem] rounded-[0.8rem] bg-[#5CD22C] p-[10px_20px]"
                                            onClick={handleCreateChatOneVOne}
                                        >
                                            <Image
                                                src={icons.message}
                                                alt="icon"
                                            />
                                        </button>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-[2.4rem] flex w-full gap-[2.4rem]">
                        <div className="flex w-[60%] flex-col gap-[2.4rem] rounded-[0.4rem] bg-[#242526] p-[2rem]">
                            {arrayTabs?.length > 0 && (
                                <div className="flex items-center">
                                    <Tabs
                                        arrayTabs={arrayTabs}
                                        onSelectTab={setSelectedTab}
                                        className="text-[1.8rem]"
                                    />
                                </div>
                            )}
                            {selectedTab === 0 && (
                                <>
                                    {profileUser &&
                                        profile?.role === 'Mentor' &&
                                        profile?.coin > 0 && (
                                            <div className="flex flex-col">
                                                <h3 className="text-[1.4rem] font-medium">
                                                    Tiền thuê
                                                </h3>
                                                <span className="text-[2.4rem]">
                                                    {formatNumeric(
                                                        profileUser?.pricePerHour,
                                                    )}
                                                    đ / 1 giờ
                                                </span>
                                            </div>
                                        )}
                                    <h3 className="text-[2rem] font-medium">
                                        {profileUser &&
                                            profileUser?.technologies?.length >
                                                0 &&
                                            'Công nghệ sử dụng'}
                                    </h3>

                                    <ul className="mt-[1.2rem] grid grid-cols-4 gap-[0.8rem]">
                                        {profileUser?.technologies?.map(
                                            (technology, index) => (
                                                <li key={index}>
                                                    <ExperienceTag
                                                        technology={
                                                            technology
                                                                ?.technology
                                                                ?.name
                                                        }
                                                        experienceYears={
                                                            technology?.experienceYears
                                                        }
                                                        showIcon={false}
                                                    />
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </>
                            )}
                            {selectedTab === 1 && (
                                <>
                                    <div className="mt-[1.2rem] flex flex-col gap-[1.2rem]">
                                        {reviews?.length > 0 ? (
                                            reviews?.map((review, index) => (
                                                <ReviewCard
                                                    key={index}
                                                    review={review}
                                                    mentorId={profileId}
                                                />
                                            ))
                                        ) : (
                                            <div className="flex h-[20rem] items-center justify-center">
                                                <p className="text-[1.6rem] font-medium">
                                                    Chưa có đánh giá
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        {profileUser && (
                            <div className="w-[40%]">
                                <BookingTime
                                    id={profileId}
                                    user={profileUser}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Profiles;
