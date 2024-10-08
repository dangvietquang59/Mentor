import paths from '@/utils/constants/paths';
import { formatTime } from '@/utils/functions/formatTime';
import Link from 'next/link';

interface RoomItemProps {
    name: string;
    from: string;
    to: string;
    id: string;
}
function RoomItem({ name, from, to, id }: RoomItemProps) {
    return (
        <Link
            href={`${paths.ROOM}/${id}`}
            className="min-h-[15rem] cursor-pointer rounded-[0.4rem] bg-[#242424] p-[2rem] hover:opacity-70"
        >
            <div className="flex items-center justify-between gap-[0.8rem]">
                <p className="text-[1.6rem] font-medium">{name}</p>
                <p className="bg-gradient-to-r from-[#3d5d30] to-[#5dd62c] bg-clip-text text-[1.6rem] font-medium text-transparent">
                    {formatTime(from)} - {formatTime(to)}
                </p>
            </div>

            <div className="flex h-full items-center justify-center">
                <div className="flex size-[5rem] items-center justify-center rounded-[0.4rem] bg-gradient-to-r from-[#3d5d30] to-[#5dd62c]">
                    <p className="text-[2.4rem] font-bold">MT</p>
                </div>
            </div>
        </Link>
    );
}

export default RoomItem;
