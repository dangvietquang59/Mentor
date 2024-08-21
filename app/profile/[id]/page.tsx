'use client';
import Image from 'next/image';
import icons from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { TabType } from '../../../types/tab';
import Tabs from '../../../components/Tabs';
import BookingTime from '../../../components/BookingTime';
import { Avatar } from 'antd';
import images from '@/assets/img';
import { useMounted } from '@/utils/hooks/useMounted';
import { usePathname, useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';
import authApi from '@/apis/authApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';

const BlockInformation = ({
    title,
    content,
}: {
    title?: string;
    content?: string;
}) => (
    <div>
        <h2 className="text-[2.5rem] font-bold">{title}</h2>
        <p className="mt-[1.2rem] text-justify text-[1.6rem] font-bold text-[#4f4e4e]">
            {content}
        </p>
    </div>
);
function Profiles() {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const mounted = useMounted();
    const router = useRouter();
    const pathname = usePathname();
    const profileId = pathname.split(`${paths.PROFILE}/`)[1];
    const [profileUser, setProfileUser] = useState<any>(null);
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
    }, [profileId]);

    const arrayTabs: TabType[] = [
        {
            title: 'Overview',
        },
        {
            title: 'Reviews',
        },
        {
            title: 'Group sessions',
        },
    ];

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
                                    Technical at K-Tech
                                </span>
                            </div>
                            {profileUser?._id === profileId ? (
                                <div className="flex items-center gap-[1.2rem] px-[2rem]">
                                    <button className="flex items-center gap-[1.6rem] rounded-[0.8rem] bg-[#5DD52C] p-[10px_20px]">
                                        <Image src={icons.plus} alt="icon" />
                                        <p className="text-[1.6rem] text-black">
                                            Add schedules
                                        </p>
                                    </button>
                                    <button
                                        className="flex items-center gap-[1.6rem] rounded-[0.8rem] bg-[#5DD52C] p-[10px_20px]"
                                        onClick={() =>
                                            router.push(
                                                `${paths.PROFILE}/${paths.EDIT}/${profileUser?._id}`,
                                            )
                                        }
                                    >
                                        <Image src={icons.editPen} alt="icon" />
                                        <p className="text-[1.6rem] text-black">
                                            Edit profile
                                        </p>
                                    </button>
                                </div>
                            ) : (
                                <div className="px-[2rem]">
                                    <button className="flex items-center gap-[1.6rem] rounded-[0.8rem] bg-[#46a321] p-[10px_20px]">
                                        <Image src={icons.message} alt="icon" />
                                        <p className="text-[1.6rem] text-white">
                                            Send message
                                        </p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-[2.4rem] flex w-full gap-[2.4rem]">
                        <div className="flex w-[60%] flex-col gap-[2.4rem] rounded-[0.4rem] bg-[#242526] p-[2rem]">
                            <div className="flex items-center">
                                <Tabs
                                    arrayTabs={arrayTabs}
                                    onSelectTab={setSelectedTab}
                                    className="text-[1.8rem]"
                                />
                            </div>
                            {selectedTab === 0 && (
                                <div>
                                    <BlockInformation
                                        title="Overview"
                                        content="Sukuna là một đấu sĩ cận chiến cực kỳ điêu luyện và mạnh mẽ. Hắn thể
                        hiện sự áp đảo trước Megumi với những đòn vật lý mạnh mẽ. Sukuna có
                        thể kết hợp thuật thức và sức mạnh tay đôi của mình, khiến hắn trở
                        thành một đối thủ cực kỳ khó bị áp đảo trong trận chiến."
                                    />
                                    <BlockInformation
                                        title="Education"
                                        content="Tốt nghiệp tại Đại học Bách khoa Hà Nội"
                                    />
                                    <BlockInformation
                                        title="Experience"
                                        content="Từng có 9 năm kinh nghiệm với vị trí Technical Leader"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-[40%]">
                            <BookingTime />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profiles;
