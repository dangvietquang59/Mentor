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
import { useMounted } from '@/utils/hooks/useMounted';
import icons from '@/assets/icons';
import { Avatar, Drawer, Tooltip } from 'antd';
import { FaHome } from 'react-icons/fa';
import { SiCodementor } from 'react-icons/si';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { useUserStore } from '@/stores/useAuthStore';
import { getProfile } from '@/utils/functions/getProfile';
import { UserType } from '@/types/user';
const Header = () => {
    const isMounted = useMounted();
    const [isSelectedPage, setIsSelectedPage] = useState<number>(0);
    const [mounted, setMounted] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const { user } = useUserStore();
    const profile: UserType = getProfile();
    const router = useRouter();
    const arrayPage: SiderType[] = [
        {
            title: 'Trang chủ',
            url: paths.HOME,
            icon: <FaHome />,
        },
        {
            title: 'Cố vấn',
            url: paths.MENTORS,
            icon: <SiCodementor />,
        },
        {
            title: 'Bài viết',
            url: paths.BLOGS,
            icon: <BsFillPostcardHeartFill />,
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
                        </div>
                        <ul className="flex flex-1 items-center justify-center gap-[1.2rem] pl-[20rem]">
                            {arrayPage.map((page, index) => (
                                <Link href={page.url} key={page.url}>
                                    <li
                                        className={`rounded-full bg-[#484848] p-[1rem] px-[1rem] text-[2rem] font-[500] ${
                                            isSelectedPage === index
                                                ? ' text-[#5DD62C]'
                                                : 'text-[#F8F8F8]'
                                        }`}
                                        onClick={() => setIsSelectedPage(index)}
                                    >
                                        <Tooltip title={page?.title}>
                                            {page.icon}
                                        </Tooltip>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <div className="flex items-center">
                            {user || profile ? (
                                <LoggedIn />
                            ) : (
                                <div className="flex gap-[1.2rem]">
                                    <ButtonCustom noBorder path={paths.SIGNIN}>
                                        Đăng nhập
                                    </ButtonCustom>
                                    <ButtonCustom path={paths.SIGNUP} outline>
                                        Đăng ký
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
