'use client';
import icons from '@/assets/icons';
import Image from 'next/image';

export type ExperienceProps = {
    id?: string;
    technology: string;
    experienceYears: number;
    onDelete?: () => void;
    showIcon?: boolean;
};
const ExperienceTag = ({
    technology,
    experienceYears,
    onDelete,
    showIcon = true,
}: ExperienceProps) => {
    return (
        <div className="group flex items-center justify-between gap-[0.8rem] rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem]">
            <div className="flex flex-col gap-[0.2rem]">
                <h3 className="m-0 text-[2rem] font-medium">{technology}</h3>
                <h3 className="m-0 text-[1.6rem] font-medium">
                    {experienceYears} years
                </h3>
            </div>
            {showIcon && (
                <div
                    className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.5)] p-[1rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                    onClick={onDelete}
                >
                    <Image
                        src={icons.trash}
                        alt="icon"
                        className="size-[2rem]"
                    />
                </div>
            )}
        </div>
    );
};

export default ExperienceTag;
