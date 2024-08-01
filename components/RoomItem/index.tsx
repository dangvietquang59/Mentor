import paths from '@/utils/constants/paths';
import Link from 'next/link';

function RoomItem() {
    return (
        <Link
            href={`${paths.ROOM}/1`}
            className="min-h-[15rem] cursor-pointer rounded-[0.4rem] bg-[#242424] p-[2rem] hover:opacity-70"
        >
            <div className="flex items-center justify-between gap-[0.8rem]">
                <p className="text-[1.6rem] font-medium">Nhóm Front End</p>
                <p className="bg-gradient-to-r from-[#3d5d30] to-[#5dd62c] bg-clip-text text-[1.6rem] font-medium text-transparent">
                    8:30 AM
                </p>
            </div>

            <div className="flex h-full items-center justify-center">
                <div className="flex size-[5rem] items-center justify-center rounded-[0.4rem] bg-gradient-to-r from-[#3d5d30] to-[#5dd62c]">
                    <p className="text-[2.4rem] font-bold">FE</p>
                </div>
            </div>
        </Link>
    );
}

export default RoomItem;
