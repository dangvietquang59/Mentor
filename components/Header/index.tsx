'use client';
import logo from '@/assets/img/Mentors.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiderType } from '@/types/sider';
import LoggedIn from '../LoggedIn';
import { usePathname } from 'next/navigation';
import ButtonCustom from '../ButtonCustom';
import paths from '@/utils/constants/paths';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useMounted } from '@/utils/hooks/useMounted';

const Header = () => {
    const isMounted = useMounted();
    const [isSelectedPage, setIsSelectedPage] = useState<number>(0);
    const [mounted, setMounted] = useState(false);
    const isLOggedIn = getAccessTokenClient();
    const arrayPage: SiderType[] = [
        {
            title: 'Home',
            url: paths.DASHBOARD,
        },
        {
            title: 'Mentors',
            url: paths.MENTORS,
        },
        {
            title: 'Blogs',
            url: paths.BLOGS,
        },
        {
            title: 'Rooms',
            url: paths.ROOM,
        },
    ];

    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const currentIndex = arrayPage.findIndex(
            (page) => page.url === pathname,
        );
        if (currentIndex !== -1) {
            setIsSelectedPage(currentIndex);
        } else {
            setIsSelectedPage(-1);
        }
    }, [pathname, mounted]);

    return (
        <>
            {isMounted && (
                <div className="fixed z-[100] flex h-[7rem] w-full items-center justify-between border-b border-b-[#0f0f0f] bg-[#1a1a1a] p-[1rem]">
                    <div className="flex items-center gap-[1.6rem]">
                        <Image
                            src={logo}
                            alt="logo"
                            className="size-[6rem] object-cover"
                        />
                        <div>
                            <ul className="flex gap-[1.2rem]">
                                {arrayPage.map((page, index) => (
                                    <Link href={page.url} key={page.url}>
                                        <li
                                            className={`px-[1rem] text-[2rem] font-[500] ${
                                                isSelectedPage === index
                                                    ? 'border-b-[0.1rem] border-b-[#5DD62C] text-[#5DD62C]'
                                                    : 'text-[#F8F8F8]'
                                            }`}
                                            onClick={() =>
                                                setIsSelectedPage(index)
                                            }
                                        >
                                            {page.title}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {isLOggedIn ? (
                            <LoggedIn />
                        ) : (
                            <div className="flex gap-[1.2rem]">
                                <ButtonCustom noBorder path={paths.SIGNIN}>
                                    Sign in
                                </ButtonCustom>
                                <ButtonCustom path={paths.SIGNUP} outline>
                                    Sign up
                                </ButtonCustom>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
