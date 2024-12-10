import images from '@/assets/img';
import { UserType } from '@/types/user';
import paths from '@/utils/constants/paths';
import { formatNumeric } from '@/utils/functions/formatNumeric';
import { Image } from 'antd';

import { useRouter } from 'next/navigation';

interface MentorProfileProps {
    mentor: UserType;
}

function MentorsProfile(props: MentorProfileProps) {
    const { mentor } = props;
    const router = useRouter();

    const maxExperienceYears = mentor?.technologies?.reduce(
        (max, tech) => Math.max(max, tech.experienceYears),
        0, // Giá trị khởi tạo là 0, đảm bảo rằng nếu không có công nghệ nào, kết quả sẽ là 0
    );

    return (
        <div
            className="group flex h-[45rem] w-full flex-col gap-[1.2rem] overflow-hidden rounded-[2.4rem] bg-[#242526] hover:cursor-pointer"
            onClick={() => router.push(`${paths.PROFILE}/${mentor?._id}`)}
        >
            <Image
                src={mentor?.imageUrl}
                alt={mentor?.fullName}
                preview={false}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                height={250}
            />
            <div className="h-full px-[1rem]">
                <div className="flex items-center justify-between gap-[1rem]">
                    <h3 className="text-[1.8rem] font-medium">
                        {mentor?.fullName}
                    </h3>
                    <div className="flex items-center gap-[0.4rem]">
                        <span className="bottom-[0.4rem] right-[0.1rem] rounded-[0.4rem] p-[0.4rem] text-[1.4rem]">
                            {formatNumeric(mentor?.pricePerHour)}/h
                        </span>
                        <Image
                            src={images.qCoin.src}
                            alt={mentor?.fullName}
                            preview={false}
                            className="w-full object-cover"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                <div className="mt-[1.2rem] flex h-full flex-col gap-[0.8rem]">
                    <p className="text-[1.4rem]">{mentor?.bio?.name}</p>
                    <ul className="flex flex-wrap items-center gap-[0.8rem]">
                        {mentor?.technologies?.length > 0 && (
                            <>
                                {mentor?.technologies
                                    .slice(0, 2)
                                    .map((item, index) => (
                                        <li
                                            key={index}
                                            className="rounded-[0.8rem] bg-[#1A1A1A] p-[0.5rem] text-[1.4rem] text-[#f1f1f1]"
                                        >
                                            {item?.technology?.name}
                                        </li>
                                    ))}
                                {mentor?.technologies.length > 2 && (
                                    <li className="rounded-[0.8rem] bg-[#1A1A1A] p-[0.5rem] text-[1.4rem] text-[#f1f1f1]">
                                        + {mentor?.technologies.length - 2}
                                    </li>
                                )}
                            </>
                        )}
                    </ul>

                    <div className="grid grid-cols-2 gap-[0.8rem]">
                        <div className="flex flex-col gap-[0.4rem] rounded-[0.8rem] bg-[#1A1A1A] p-[1rem]">
                            <p className="text-[1.4rem] font-medium">
                                Điểm đánh giá
                            </p>
                            <p className="text-[1.2rem]">
                                {mentor?.rating
                                    ? `${mentor?.rating}/5.0`
                                    : '0 / 5.0'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-[0.4rem] rounded-[0.8rem] bg-[#1A1A1A] p-[1rem]">
                            <p className="text-[1.4rem] font-medium">
                                Kinh nghiệm
                            </p>
                            <p className="text-[1.2rem]">
                                {maxExperienceYears} năm
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MentorsProfile;
