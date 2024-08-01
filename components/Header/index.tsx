'use client';
import logo from '@/assets/img/Mentors.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SiderType } from '@/types/sider';
import LoggedIn from '../LoggedIn';
import { usePathname } from 'next/navigation';
import ButtonCustom from '../ButtonCustom';
import paths from '@/utils/constants/paths';

const Header = () => {
    const [isSelectedPage, setIsSelectedPage] = useState<number>(0);
    const [mounted, setMounted] = useState(false);

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
    }, [pathname, mounted, arrayPage]);

    const user = true;
    return (
        <div className="fixed z-[100] flex h-[8rem] w-full items-center justify-between border-b border-b-[#0f0f0f] bg-[#1c1e21] p-[1rem]">
            <div className="flex items-center gap-[1.6rem]">
                <Image
                    src={logo}
                    alt="logo"
                    className="size-[6rem] rounded-full"
                />
                <div>
                    <ul className="flex gap-[1.2rem]">
                        {arrayPage.map((page, index) => (
                            <Link href={page.url} key={page.url}>
                                <li
                                    className={`px-[1rem] text-[2rem] font-[700] ${
                                        isSelectedPage === index
                                            ? 'border-b-[0.1rem] border-b-[#5DD62C] font-[700] text-[#5DD62C]'
                                            : 'text-[#F8F8F8]'
                                    }`}
                                    onClick={() => setIsSelectedPage(index)}
                                >
                                    {page.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex items-center">
                {user ? (
                    <LoggedIn />
                ) : (
                    <div className="flex gap-[1.2rem]">
                        <ButtonCustom noBorder path="/signin">
                            Sign in
                        </ButtonCustom>
                        <ButtonCustom path="/signup" outline>
                            Sign up
                        </ButtonCustom>
                    </div>
                )}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
