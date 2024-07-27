'use client';
import Image from 'next/image';
import icons from '../../../assets/icons';
import { useState } from 'react';
import { TabType } from '../../../types/tab';
import Tabs from '../../../components/Tabs';
import BookingTime from '../../../components/BookingTime';

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
        <div className="min-h-[120rem] w-full p-[1rem]">
            <div className="h-[15rem] bg-[#5b8c00]"></div>
            <div className="flex">
                <div className="relative ml-[10rem] w-[15rem]">
                    <picture>
                        <img
                            src="https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008414388.jpg?quality=75&strip=all&w=1024"
                            alt="avatar"
                            className="absolute top-[-5rem] h-[15rem] w-[15rem] rounded-full border-[0.3rem] border-white object-cover"
                        />
                    </picture>
                </div>
                <div className="ml-[1.5rem] mt-[1.5rem] flex grow items-center justify-between">
                    <div>
                        <p className="text-[2rem] font-bold">Ryomen Sukuna</p>
                        <span className="text-[1.6rem] font-bold text-[#6b7b8a]">
                            Technical at K-Tech
                        </span>
                    </div>
                    <div className="flex items-center  gap-[2.4rem]">
                        <div className="flex cursor-pointer items-center justify-center rounded p-[1rem] shadow-[0rem_0.5rem_2.4rem_rgba(0,0,0,0.1)]">
                            <button className="h-[2.5rem] w-[2.5rem]">
                                <Image src={icons.chat} alt="icon" />
                            </button>
                        </div>
                        <div className="flex cursor-pointer items-center justify-center rounded p-[1rem] shadow-[0rem_0.5rem_2.4rem_rgba(0,0,0,0.1)]">
                            <button className="h-[2.5rem] w-[2.5rem]">
                                <Image src={icons.heart} alt="icon" />
                            </button>
                        </div>
                        <div className="flex cursor-pointer items-center justify-center rounded p-[1rem] shadow-[0rem_0.5rem_2.4rem_rgba(0,0,0,0.1)]">
                            <button className="h-[2.5rem] w-[2.5rem]">
                                <Image src={icons.moreInfo} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-[7rem] flex w-full gap-[2.4rem]">
                <div className="flex w-[60%] flex-col gap-[2.4rem]">
                    <div className="flex items-center border-b-[0.1rem] border-b-[#ccc]">
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
    );
}

export default Profiles;
