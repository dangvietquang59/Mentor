'use client';
import icons from '@/app/assets/icons';
import SiderItem from './SiderItem';
import { SiderType } from '@/app/types/sider';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function Sider() {
    const arraySider: SiderType[] = [
        {
            icon: icons.home,
            activeIcon: icons.homeGreen,
            title: 'Home',
        },
        {
            icon: icons.monitor,
            activeIcon: icons.monitorGreen,
            title: 'Mentors',
        },
        {
            icon: icons.message,
            activeIcon: icons.messageGreen,
            title: 'Message',
        },
        {
            icon: icons.clipboard,
            activeIcon: icons.clipboardGreen,
            title: 'Booking',
        },
    ];

    const router = useRouter();
    const pathname = usePathname();

    const getPathIndex = (path: string): number => {
        switch (path) {
            case '/':
                return 0;
            case '/mentors':
                return 1;
            case '/messages':
                return 2;
            case '/booking':
                return 3;
            default:
                return -1; // Return -1 for unmatched paths
        }
    };

    const [selectedSider, setSelectedSider] = useState<number>(
        getPathIndex(pathname),
    );

    const handleSelectedSider = (index: number) => {
        setSelectedSider(index);
        switch (index) {
            case 0:
                router.push('/');
                break;
            case 1:
                router.push('/mentors');
                break;
            case 2:
                router.push('/messages');
                break;
            case 3:
                router.push('/booking');
                break;
            default:
                break;
        }
    };

    // Ensure selectedSider updates if the pathname changes
    useEffect(() => {
        setSelectedSider(getPathIndex(pathname));
    }, [pathname]);

    return (
        <div className="fixed w-[10rem] px-[1rem]">
            {arraySider.length > 0 &&
                arraySider.map((item, index) => (
                    <SiderItem
                        key={index} // Add key prop to avoid warnings
                        icon={item.icon}
                        activeIcon={item.activeIcon}
                        title={item.title}
                        onItemClick={() => handleSelectedSider(index)}
                        isSelected={selectedSider === index}
                    />
                ))}
        </div>
    );
}

export default Sider;
