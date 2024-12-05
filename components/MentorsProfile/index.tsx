import { UserType } from '@/types/user';
import { Image } from 'antd';
import ButtonCustom from '../ButtonCustom';
import paths from '@/utils/constants/paths';

interface MentorProfileProps {
    mentor: UserType;
}

function MentorsProfile(props: MentorProfileProps) {
    const { mentor } = props;

    const maxExperienceYears = mentor?.technologies?.reduce(
        (max, tech) => Math.max(max, tech.experienceYears),
        0, // Giá trị khởi tạo là 0, đảm bảo rằng nếu không có công nghệ nào, kết quả sẽ là 0
    );

    return (
        <div className="group relative flex h-[45rem] w-full flex-col gap-[1.2rem] overflow-hidden rounded-[2.4rem] bg-[#242526]">
            <Image
                src={mentor?.imageUrl}
                alt={mentor?.fullName}
                preview={false}
                className="w-full object-cover"
                height={250}
            />
            <div className="h-full px-[1rem]">
                <h3 className="text-[1.8rem] font-medium">
                    {mentor?.fullName}
                </h3>
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
                                        + {mentor?.technologies.length - 2} more
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

            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ButtonCustom outline path={`${paths.PROFILE}/${mentor?._id}`}>
                    Xem chi tiết
                </ButtonCustom>
            </div>
        </div>
    );
}

export default MentorsProfile;
