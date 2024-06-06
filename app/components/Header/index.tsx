'use client';
import icons from '@/app/assets/icons';
import logo from '@/app/assets/img/Mentors.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Wrapper from '../Wrapper';
import CategoryItem from '../CategoryItem';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SiderType } from '@/app/types/sider';
import LoggedIn from '../LoggedIn';
import { usePathname } from 'next/navigation';

const Header = () => {
    const [isSelectedPage, setIsSelectedPage] = useState<number>(0);
    const [mounted, setMounted] = useState(false);

    const arrayPage: SiderType[] = [
        {
            title: 'Home',
            url: '/dashboard',
        },
        {
            title: 'Mentors',
            url: '/mentors',
        },
        {
            title: 'Streaming',
            url: '/room',
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

    const user = true;
    return (
        <div className="fixed z-[100] flex h-[8rem] w-full items-center justify-between border-b bg-white p-[1rem]">
            <div className="flex items-center gap-[2.4rem]">
                <Image
                    src={logo}
                    alt="logo"
                    className="h-[7rem] w-[7rem] rounded-[0.8rem]"
                />
                <div>
                    <ul className="flex gap-[1.2rem]">
                        {arrayPage.map((page, index) => (
                            <Link href={page.url} key={page.url}>
                                <li
                                    className={`p-[1rem] text-[1.6rem] font-bold text-[#254000] ${isSelectedPage === index && 'text-[#7cb305]'}`}
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
                        <button className="rounded-[0.8rem] p-[1.5rem] text-[1.6rem] font-bold text-[#254000]">
                            <Link href={'/signin'}>Sign in</Link>
                        </button>
                        <button className="rounded-[0.8rem] bg-[#254000] p-[1.5rem] text-[1.6rem] font-bold text-white">
                            <Link href={'/signup'}>Sign up</Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default dynamic(() => Promise.resolve(Header), { ssr: false });
