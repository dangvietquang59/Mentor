import React from 'react';
import Image from 'next/image';
import icons from '@/assets/icons';

interface ItemInformationProps {
    icon: string;
    name?: string;
    path?: string;
}

interface ILinkItemProps {
    title: string;
    path: string;
}
function Footer() {
    const arrayInformation: ItemInformationProps[] = [
        {
            icon: icons.address,
            name: 'Thành phố Hồ Chí Minh',
        },
        {
            icon: icons.email,
            name: 'dvquang5902@gmail.com',
        },
        {
            icon: icons.phoneNumber,
            name: '0359088784',
        },
    ];
    const arrayLinks: ILinkItemProps[] = [
        {
            title: 'Về chúng tôi',
            path: '',
        },
        {
            title: 'Cố vấn',
            path: '',
        },

        {
            title: 'Liên hệ',
            path: '',
        },
    ];
    const arraySocial: ItemInformationProps[] = [
        {
            icon: icons.facebook,
            path: '',
        },
        {
            icon: icons.twitter,
            path: '',
        },
        {
            icon: icons.telegram,
            path: '',
        },
        {
            icon: icons.instagram,
            path: '',
        },
        {
            icon: icons.linkedIn,
            path: '',
        },
    ];
    return (
        <footer className="w-full bg-[#1A1A1A] p-[1.6rem_2.4rem] md:min-h-[55rem] md:p-[6rem]">
            <h2 className="mb-[3rem] text-[2.7rem] font-medium text-[#5DD62C]">
                Mentor Systems
            </h2>
            <div className="grid grid-cols-1 gap-[5rem] md:grid-cols-2 md:gap-[13rem]">
                <div>
                    <div className="flex flex-col gap-[3rem]">
                        <h2 className=" text-[2.7rem] font-medium text-[#F8F8F8]">
                            Một trang web nơi các chuyên gia Công nghệ thông tin
                            có thể tìm thấy người cố vấn
                        </h2>
                        <p className=" text-[1.8rem] font-normal text-[#F8F8F8]">
                            Mục tiêu của chúng tôi là cung cấp cho những người
                            được cố vấn cơ hội phát triển và học hỏi từ những cá
                            nhân dày dạn kinh nghiệm, thúc đẩy sự phát triển cả
                            về chuyên môn và cá nhân của họ. trong lĩnh vực thực
                            hiện tiềm năng.
                        </p>
                    </div>
                    <div className="mt-[3rem]">
                        <ul className="flex flex-col gap-[3rem]">
                            {arrayInformation.map((item, index) => (
                                <li
                                    className="flex items-center gap-[1.6rem]"
                                    key={index}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={'icon'}
                                        width={24}
                                        height={24}
                                    />
                                    <span className="text-[1.6rem] font-normal text-[#F8F8F8]">
                                        {item.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text-justify text-[2.7rem] font-medium text-[#F8F8F8]">
                        Trang thông tin
                    </h2>
                    <ul className="mt-[3rem] flex flex-col gap-[3rem]">
                        {arrayLinks.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer text-[2.1rem] text-[#F8F8F8] hover:underline"
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                    <ul className="mt-[3rem] flex items-center gap-[1.6rem]">
                        {arraySocial.map((item, index) => (
                            <li key={index} className="cursor-pointer">
                                <Image
                                    src={item.icon}
                                    alt="social"
                                    width={24}
                                    height={24}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
