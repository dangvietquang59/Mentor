import { ReviewType } from '@/types/response/review';
import { formatDate } from '@/utils/functions/formatDate';
import { Avatar } from 'antd';
import StarRatings from 'react-star-ratings';

interface ReviewCardProps {
    review: ReviewType;
    mentorId: string;
}

function ReviewCard({ review, mentorId }: ReviewCardProps) {
    return (
        <>
            {mentorId !== review?.user?._id && (
                <div className="w-full rounded-[0.8rem] border border-[#ccc] p-[2rem]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[1.2rem]">
                            <Avatar
                                src={review?.user?.imageUrl}
                                alt="avatar"
                                size={50}
                            />
                            <div>
                                <h3 className="text-[1.6rem] font-bold">
                                    {review?.user?.fullName}
                                </h3>
                                <span className="text-[1.4rem]">
                                    {formatDate(review?.createdAt)}
                                </span>
                            </div>
                        </div>
                        <div>
                            {/* <p className="rounded-[0.8rem] p-[1rem] text-[2.4rem] font-bold text-[#5DD62C]">
                            {review?.point}/5.0
                        </p> */}
                            <StarRatings
                                rating={Number(review?.point)}
                                starRatedColor="green"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="5px"
                            />
                        </div>
                    </div>
                    <p className="mt-[2.4rem] text-justify text-[1.4rem]">
                        {review?.content}
                    </p>
                    <ul className="mt-[2.4rem] flex items-center justify-end gap-[0.8rem]">
                        {review?.technologies?.length > 0 &&
                            review?.technologies?.map((item, index) => (
                                <li
                                    key={index}
                                    className="rounded-[0.8rem] bg-[#5DD62C] p-[1rem] font-medium text-black"
                                >
                                    {item?.name}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ReviewCard;
