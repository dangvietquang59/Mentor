import bookingApi from '@/apis/bookingApi';
import { BookingGetResponeType } from '@/types/response/booking';
import { UserType } from '@/types/user';
import paths from '@/utils/constants/paths';
import { formatDate } from '@/utils/functions/formatDate';
import { getProfile } from '@/utils/functions/getProfile';

import { Avatar, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ReviewModal from '../ReviewModal';
import { useRouter } from 'next/navigation';
import { ReviewType } from '@/types/response/review';
import reviewApi from '@/apis/reviewApi';

interface BookingCardProps {
    booking: BookingGetResponeType;
    token: string;
    refreshData: () => void;
}
enum BookingStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Canceled = 'Canceled',
}

function BookingCard({ booking, token, refreshData }: BookingCardProps) {
    const profile: UserType = getProfile();
    const isMentor = profile?._id === booking?.participants?.[0]?._id;
    const [openReview, setOpenReview] = useState(false);
    const router = useRouter();
    const [reviews, setReviews] = useState<ReviewType[]>([]);

    useEffect(() => {
        const fetchReview = async () => {
            await reviewApi
                .getByUserId(profile?._id, token)
                .then((res) => {
                    if (res) {
                        setReviews(res?.reviews);
                    }
                })
                .catch((err) => console.log(err));
        };
        fetchReview();
    }, []);
    const isReview = reviews?.some(
        (item) => item?.bookingId?._id === booking?._id,
    );
    const showReview = () => setOpenReview(true);
    const createReview = () => setOpenReview(false);
    const cancelReview = () => setOpenReview(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'orange';
            case 'Accepted':
                return 'green';
            case 'Refused':
                return 'red';
            default:
                return 'gray';
        }
    };
    const getVNText = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'Chờ chấp nhận';
            case 'Accepted':
                return 'Đã chấp nhận';
            case 'Refused':
                return 'Từ chối';
            default:
                return 'Hủy';
        }
    };
    const handleUpdateBooking = async (status: string) => {
        const data = { status, userId: profile?._id };
        try {
            await bookingApi.update(booking?._id, data, token);
            toast.success('Cập nhật thành công');
            refreshData();
        } catch {
            toast.error('Cập nhật thất bại');
        }
    };

    const RenderButton = () => {
        return (
            <>
                {booking?.status === BookingStatus.Pending ? (
                    <div className="flex space-x-4">
                        {profile?.role === 'Mentor' && (
                            <button
                                className="rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                onClick={() =>
                                    handleUpdateBooking(BookingStatus.Accepted)
                                }
                            >
                                Chấp nhận
                            </button>
                        )}
                        <button
                            className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={() =>
                                handleUpdateBooking(BookingStatus.Canceled)
                            }
                        >
                            Hủy
                        </button>
                    </div>
                ) : booking?.status === BookingStatus.Accepted ? (
                    <div className="flex space-x-4">
                        {profile?.role !== 'Mentor' && !isReview && (
                            <button
                                className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                onClick={showReview}
                            >
                                Đánh giá
                            </button>
                        )}
                        <button
                            className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() =>
                                router.push(`${paths.ROOM}/${booking?._id}`)
                            }
                        >
                            Vào phòng
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    };
    return (
        <>
            <div className="flex min-h-[18rem] w-full flex-col gap-[1.4rem] rounded-[1rem] bg-[#1E1E1E] p-[1.4rem] shadow-lg transition-all hover:shadow-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-[1.8rem] font-bold text-white">
                        {booking?.freetimeDetailId?.name}
                    </h3>

                    <RenderButton />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[1rem]">
                        <p className="text-[1.4rem] text-white">
                            {booking?.from}
                        </p>
                        <span className="text-[1.4rem] text-white">-</span>
                        <p className="text-[1.4rem] text-white">{booking.to}</p>
                    </div>
                    <p className="text-[1.4rem] text-[#A1A1A1]">
                        {formatDate(booking?.freetimeDetailId?.from)}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[1rem]">
                        <Avatar
                            src={
                                isMentor
                                    ? booking?.participants?.[1]?.imageUrl
                                    : booking?.participants?.[0]?.imageUrl
                            }
                            alt="avatar"
                            size={48}
                        />
                        <div>
                            <h4 className="text-[1.6rem] font-semibold text-white">
                                {isMentor
                                    ? booking?.participants?.[1]?.fullName
                                    : booking?.participants?.[0]?.fullName}
                            </h4>
                            <p className="text-[1.4rem] text-[#5DD62C]">
                                {isMentor
                                    ? 'Yêu cầu tới bạn'
                                    : booking?.status !== 'Accepted'
                                      ? 'Chờ xác nhận từ cố vấn'
                                      : ''}
                            </p>
                        </div>
                    </div>
                    <Tag
                        color={getStatusColor(booking?.status)}
                        className="w-fit text-[1.4rem] font-medium"
                    >
                        {getVNText(booking?.status)}
                    </Tag>
                </div>
            </div>

            <ReviewModal
                bookingId={booking?._id}
                mentor={booking?.participants?.[0]}
                open={openReview}
                handleOk={createReview}
                handleCancel={cancelReview}
                mutate={refreshData}
            />
        </>
    );
}

export default BookingCard;
