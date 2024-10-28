import images from '@/assets/img';
import { NotificationType } from '@/types/response/notification';
import paths from '@/utils/constants/paths';
import { formatDate } from '@/utils/functions/formatDate';
import { Avatar } from 'antd';
import Link from 'next/link';

interface NotificationItemProps {
    noti: NotificationType;
}
function NotificationItem({ noti }: NotificationItemProps) {
    const getPaths = (type: string): string | undefined => {
        const mapping: { [key: string]: string } = {
            Booking: paths.BOOKINGS,
            Blog: `${paths.BLOGS}`,
            Comment: `${paths.BLOGS}/${paths.VIEW}`,
        };

        return mapping[type];
    };
    const path = getPaths(noti?.entityType);
    console.log(noti);
    return (
        <Link
            href={`${path}/${noti?.entityId}`}
            className={`flex  min-h-[4rem] cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] p-[1rem] duration-300 hover:bg-[#1A1A1A] ${noti?.isRead ? '' : 'bg-[#1A1A1A]'}`}
        >
            <Avatar
                src={noti?.sender?.imageUrl || images?.defaultAvatar.src}
                size={50}
                className="size-[5rem]"
            />
            <div>
                <p
                    className={`text-[1.4rem] ${noti?.isRead ? 'font-normal' : 'font-bold'}`}
                >
                    {noti?.content}
                </p>
                <span>{formatDate(noti?.createdAt)}</span>
            </div>
        </Link>
    );
}

export default NotificationItem;
