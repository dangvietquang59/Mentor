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
            title: 'About us',
            path: '',
        },
        {
            title: 'Mentors',
            path: '',
        },
        {
            title: 'Join as a mentor',
            path: '',
        },
        {
            title: 'Contact',
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
        <footer className="min-h-[55rem] bg-[#1A1A1A] p-[6rem]">
            <h2 className="mb-[3rem] text-[2.7rem] font-medium text-[#5DD62C]">
                Mentor Systems
            </h2>
            <div className="grid grid-cols-2 gap-[13rem]">
                <div>
                    <div className="flex flex-col gap-[3rem]">
                        <h2 className="text-justify text-[2.7rem] font-medium text-[#F8F8F8]">
                            A website where IT professionals can find mentors
                        </h2>
                        <p className="text-justify text-[1.8rem] font-normal text-[#F8F8F8]">
                            Our goal is to provide mentees with opportunities to
                            grow and learn from seasoned individuals, advancing
                            both their professional and personal development. in
                            the realm of potential fulfillment.
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
                        Links
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
