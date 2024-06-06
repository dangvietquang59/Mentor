import icons from '@/app/assets/icons';
import Image from 'next/image';

function NotificationItem() {
    return (
        <div className=" my-[1.2rem] flex flex h-[4rem] cursor-pointer items-center items-center gap-[0.8rem] duration-300 hover:text-[#5b8c00] hover:underline">
            <Image src={icons.bell} alt="bell" />
            <span className="text-[1.4rem] font-semibold">
                Bạn có thông báo mới nè
            </span>
        </div>
    );
}

export default NotificationItem;
