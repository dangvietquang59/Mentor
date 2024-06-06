import icons from '@/app/assets/icons';
import { limitWord } from '@/app/functions/limitWords';
import { AttributeMentorItem, MentorItemType } from '@/app/types/mentor';
import Image from 'next/image';
import Link from 'next/link';

const InfoItem = ({ title, icon }: AttributeMentorItem) => (
    <div className="flex items-center gap-[0.8rem]">
        <Image src={icon} alt="icon" />
        <span className="text-[1.4rem] font-bold">{limitWord(title, 3)}</span>
    </div>
);
function MentorItem({ name, url, attributes }: MentorItemType) {
    return (
        <Link href={'/profiles'}>
            <div className="min-h-[30rem] w-[30rem] cursor-pointer rounded-[0.8rem] border-[0.2rem] p-[1rem] duration-300 hover:border-[0.2rem] hover:border-[#5b8c00]">
                <picture>
                    <img
                        src={url}
                        alt="avatar"
                        className="h-[15rem] w-full rounded-[0.8rem] object-cover"
                    />
                </picture>
                <div className="mt-[1.2rem] flex w-[80%] flex-col gap-[1.2rem]">
                    <h3 className="break-words text-[1.6rem] font-bold">
                        {name}
                    </h3>
                    {attributes &&
                        attributes.map((item, index) => (
                            <InfoItem
                                title={item.title}
                                icon={item.icon}
                                key={index}
                            />
                        ))}
                </div>
            </div>
        </Link>
    );
}

export default MentorItem;
