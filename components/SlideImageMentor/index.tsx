import { MentorItemType } from '@/types/mentor';
import Link from 'next/link';

function SlideImageMentor({ name, url, position, attributes }: MentorItemType) {
    return (
        <Link href={'/profiles'}>
            <div className="relative h-[30rem] w-[25rem] cursor-pointer">
                <picture>
                    <img
                        src={url}
                        alt="avatar"
                        className="h-full w-full rounded-[2rem] object-cover"
                    />
                </picture>
                <div className="absolute bottom-2 left-3 flex flex-col gap-[0.8rem]">
                    <p className="text-[1.8rem] font-bold text-white">{name}</p>
                    <p className="text-[1.6rem] font-bold text-white">
                        {position}
                    </p>
                    <ul className="flex items-center gap-[0.8rem]">
                        {attributes.map((item) => (
                            <li className="rounded-[2rem] bg-[rgba(104,103,103,0.7)] p-[0.5rem] text-[1.4rem] font-bold text-[white]">
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Link>
    );
}

export default SlideImageMentor;
