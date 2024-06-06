import icons from '@/app/assets/icons';
import Image from 'next/image';
import Link from 'next/link';

function SesionToday() {
    return (
        <div className="rounded-[0.8rem] p-[1rem]">
            <div className="flex items-center gap-[0.8rem] border-b p-[1rem]">
                <Image
                    src={icons.calendar}
                    alt="icon"
                    className="h-[1.5rem] w-[1.5rem]"
                />
                <h2 className="text-[1.6rem] font-bold text-[#254000]">
                    Session today
                </h2>
            </div>
            <div className="mt-[2.4rem] flex flex-col gap-[1.2rem]">
                <Link
                    href={'/booking'}
                    className="flex items-center gap-[0.8rem] border-b p-[1rem]"
                >
                    <span className="grow p-[1rem] text-[1.4rem] font-bold">
                        Learning Front-end
                    </span>
                    <span className="rounded-[0.8rem] bg-[#254000] p-[1rem] text-[1.4rem] font-bold text-white">
                        10:35
                    </span>
                </Link>
                <Link
                    href={'/booking'}
                    className="flex items-center gap-[0.8rem] border-b p-[1rem]"
                >
                    <span className="grow p-[1rem] text-[1.4rem] font-bold">
                        Learning Back-end
                    </span>
                    <span className="rounded-[0.8rem] bg-[#254000] p-[1rem] text-[1.4rem] font-bold text-white">
                        15:30
                    </span>
                </Link>
                <Link
                    href={'/booking'}
                    className="flex items-center gap-[0.8rem] border-b p-[1rem]"
                >
                    <span className="grow p-[1rem] text-[1.4rem] font-bold">
                        Learning Dev ops
                    </span>
                    <span className="rounded-[0.8rem] bg-[#254000] p-[1rem] text-[1.4rem] font-bold text-white">
                        19:00
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default SesionToday;
