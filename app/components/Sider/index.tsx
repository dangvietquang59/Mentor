'use client';
import icons from '@/app/assets/icons';
import SiderItem from './SiderItem';
import { SiderType } from '@/app/types/sider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Sider() {
    const arraySider: SiderType[] = [
        {
            icon: icons.home,
            title: 'Home',
        },
        {
            icon: icons.monitor,
            title: 'Mentors',
        },
        {
            icon: icons.message,
            title: 'Message',
        },
        {
            icon: icons.clipboard,
            title: 'Booking',
        },
    ];
    const [selectedSider, setSelectedSider] = useState<number>(0);
    const router = useRouter();

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
                router.push('/message');
                break;
            case 3:
                router.push('/booking');
                break;
            default:
                break;
        }
    };

    return (
        <div className="w-[10rem] p-[1rem]">
            {arraySider.length > 0 &&
                arraySider.map((item, index) => (
                    <SiderItem
                        icon={item.icon}
                        title={item.title}
                        onItemClick={() => handleSelectedSider(index)}
                        isSelected={selectedSider === index}
                    />
                ))}
        </div>
    );
}

export default Sider;
