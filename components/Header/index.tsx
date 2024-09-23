'use client';
import logo from '@/assets/img/Mentors.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SiderType } from '@/types/sider';
import LoggedIn from '../LoggedIn';
import { usePathname, useRouter } from 'next/navigation';
import ButtonCustom from '../ButtonCustom';
import paths from '@/utils/constants/paths';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useMounted } from '@/utils/hooks/useMounted';
import icons from '@/assets/icons';
import { Avatar, Drawer } from 'antd';

const Header = () => {
    const isMounted = useMounted();
    const [isSelectedPage, setIsSelectedPage] = useState<number>(0);
    const [mounted, setMounted] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const isLOggedIn = getAccessTokenClient();
    const router = useRouter();
    const arrayPage: SiderType[] = [
        {
            title: 'Home',
            url: paths.HOME,
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
    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };
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

    const handleRouteMobile = (path: string) => {
        router.push(path);
        setOpenDrawer(false);
    };

    return (
        <>
            {isMounted && (
                <>
                    <div className="fixed z-[100] hidden h-[7rem] w-full items-center justify-between border-b border-b-[#0f0f0f] bg-[#1a1a1a] p-[1rem] md:flex">
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
                    <div className="fixed z-[100] flex h-[6rem] w-full items-center justify-between bg-[#1a1a1a] p-[1.6rem_2.4rem] md:hidden">
                        <div onClick={showDrawer}>
                            <Image
                                src={icons.menu}
                                alt="icon"
                                width={24}
                                height={24}
                            />
                        </div>
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/167729556?s=48&v=4"
                            size={40}
                        />
                    </div>
                    <Drawer
                        title="Basic Drawer"
                        onClose={onClose}
                        open={openDrawer}
                        className="block md:hidden"
                        width={300}
                        placement="left"
                    >
                        <ul className="flex flex-col gap-[1.2rem]">
                            {arrayPage.map((item, index) => (
                                <li
                                    className="font-bold"
                                    key={index}
                                    onClick={() => handleRouteMobile(item.url)}
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </Drawer>
                </>
            )}
        </>
    );
};

export default Header;
