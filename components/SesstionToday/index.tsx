import icons from '@/assets/icons';
import paths from '@/utils/constants/paths';
import Image from 'next/image';
import Link from 'next/link';

function SesionToday() {
    return (
        <div className="rounded-[0.8rem] p-[1rem]">
            <div className="flex items-center justify-between border-b p-[1rem]">
                <div className="flex items-center gap-[0.8rem]">
                    <Image
                        src={icons.calendar}
                        alt="icon"
                        className="h-[1.5rem] w-[1.5rem]"
                    />
                    <h2 className="text-[1.6rem] font-bold text-[#5DD62C]">
                        Session today
                    </h2>
                </div>
                <Link
                    href={paths.SCHEDULES}
                    className="cursor-pointer text-[1.6rem] font-bold text-[#5DD62C] hover:underline"
                >
                    Open schedule
                </Link>
            </div>
            <div className="mt-[2.4rem] flex flex-col gap-[2.4rem]">
                <Link href={'/booking'}>
                    <div className="flex items-center gap-[0.8rem] duration-300 hover:text-[#5dd62c]">
                        <span className="grow p-[1rem] text-[1.4rem] font-bold">
                            Learning Front-end
                        </span>
                        <span className="rounded-[0.8rem] bg-gradient-to-r from-[#355429] to-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white">
                            10:35
                        </span>
                    </div>
                </Link>
                <Link href={'/booking'}>
                    <div className="flex items-center gap-[0.8rem] duration-300 hover:text-[#5dd62c]">
                        <span className="grow p-[1rem] text-[1.4rem] font-bold">
                            Learning Front-end
                        </span>
                        <span className="rounded-[0.8rem] bg-gradient-to-r from-[#355429] to-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white">
                            10:35
                        </span>
                    </div>
                </Link>
                <Link href={'/booking'}>
                    <div className="flex items-center gap-[0.8rem] duration-300 hover:text-[#5dd62c]">
                        <span className="grow p-[1rem] text-[1.4rem] font-bold">
                            Learning Front-end
                        </span>
                        <span className="rounded-[0.8rem] bg-gradient-to-r from-[#355429] to-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white">
                            10:35
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SesionToday;
