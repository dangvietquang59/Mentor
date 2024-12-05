import bookingApi from '@/apis/bookingApi';
import icons from '@/assets/icons';
import { BookingGetResponeType } from '@/types/response/booking';
import { UserType } from '@/types/user';
import paths from '@/utils/constants/paths';
import { formatDate } from '@/utils/functions/formatDate';
import { formatTime } from '@/utils/functions/formatTime';
import { getProfile } from '@/utils/functions/getProfile';

import { Avatar, Popover, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import ReviewModal from '../ReviewModal';
import { useRouter } from 'next/navigation';

interface BookingCardProps {
    booking: BookingGetResponeType;
    token: string;
    refreshData: () => void;
}

function BookingCard({ booking, token, refreshData }: BookingCardProps) {
    const profile: UserType = getProfile();
    const isMentor = profile?._id === booking?.participants?.[0]?._id;
    const [openReview, setOpenReview] = useState(false);
    const router = useRouter();

    const isAfter = isCurrentDateAfterBookingDate(
        booking?.freetimeDetailId?.to,
    );
    function isCurrentDateAfterBookingDate(bookingDate: string) {
        const currentDate = new Date();
        const bookingDateObj = new Date(bookingDate);

        if (currentDate.getTime() > bookingDateObj.getTime()) {
            return true; // Ngày hiện tại sau ngày giờ đặt
        } else if (currentDate.getTime() < bookingDateObj.getTime()) {
            return false; // Ngày hiện tại trước ngày giờ đặt
        } else {
            return false; // Ngày giờ giống nhau
        }
    }

    const showReview = () => setOpenReview(true);
    const createReview = () => setOpenReview(true);
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

    const handleUpdateBooking = async (status: string) => {
        const data = { status };
        try {
            await bookingApi.update(booking?._id, data, token);
            toast.success('Cập nhật thành công');
            refreshData();
        } catch {
            toast.error('Cập nhật thất bại');
        }
    };

    const content = (
        <div className="flex flex-col gap-[1.2rem]">
            {booking?.status === 'Pending' && (
                <>
                    {booking?.participants?.[0]?._id === profile?._id ? (
                        <>
                            <button
                                className="flex items-center gap-[0.8rem] rounded px-2 py-1 text-[1.6rem] font-medium text-white "
                                onClick={() => handleUpdateBooking('Accepted')}
                            >
                                <Image
                                    src={icons.check}
                                    alt="check-icon"
                                    className="w-[1.8rem]"
                                />
                                Accept
                            </button>
                            <button
                                className="flex items-center gap-[0.8rem] rounded px-2 py-1 text-[1.6rem] font-medium text-white "
                                onClick={() => handleUpdateBooking('Refused')}
                            >
                                <Image
                                    src={icons.xIcon}
                                    alt="check-icon"
                                    className="w-[1.8rem]"
                                />
                                Refuse
                            </button>
                        </>
                    ) : (
                        <button
                            className="flex items-center gap-[0.8rem] rounded px-2 py-1 text-[1.6rem] font-medium text-white "
                            onClick={() => handleUpdateBooking('Canceled')}
                        >
                            <Image
                                src={icons.xIcon}
                                alt="cancel-icon"
                                className="w-[1.8rem]"
                            />
                            Cancel
                        </button>
                    )}
                </>
            )}
            {booking?.status === 'Accepted' && (
                <>
                    <button
                        className="flex items-center gap-[0.8rem] rounded px-2 py-1 text-[1.6rem] font-medium text-white "
                        onClick={showReview}
                    >
                        <Image
                            src={icons.comment}
                            alt="review-icon"
                            className="w-[1.8rem]"
                        />
                        Review
                    </button>
                    <button
                        className={`flex items-center gap-[0.8rem] rounded px-2 py-1 text-[1.6rem] font-medium text-white ${isAfter ? 'hidden' : 'block'}`}
                        onClick={() =>
                            router.push(`${paths.ROOM}/${booking?._id}`)
                        }
                        disabled={isAfter}
                    >
                        <Image
                            src={icons.video}
                            alt="view-icon"
                            className="w-[1.8rem]"
                        />
                        View
                    </button>
                </>
            )}
        </div>
    );

    return (
        <>
            <div className="flex min-h-[18rem] w-full flex-col gap-[1.4rem] rounded-[1rem] bg-[#1E1E1E] p-[1.4rem] shadow-lg transition-all hover:shadow-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-[1.8rem] font-bold text-white">
                        {booking?.freetimeDetailId?.name}
                    </h3>
                    <Popover
                        content={booking?.status !== 'Refused' ? content : null}
                        placement="bottomRight"
                    >
                        <button className="text-[1.8rem]">
                            <Image
                                src={icons.moreHorizontal}
                                alt="menu"
                                className="w-[2.4rem]"
                            />
                        </button>
                    </Popover>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[1rem]">
                        <p className="text-[1.4rem] text-white">
                            {formatTime(booking?.freetimeDetailId?.from)}
                        </p>
                        <span className="text-[1.4rem] text-white">-</span>
                        <p className="text-[1.4rem] text-white">
                            {formatTime(booking?.freetimeDetailId?.to)}
                        </p>
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
                        {booking?.status}
                    </Tag>
                </div>
            </div>

            <ReviewModal
                bookingId={booking?._id}
                mentor={booking?.participants?.[0]}
                open={openReview}
                handleOk={createReview}
                handleCancel={cancelReview}
            />
        </>
    );
}

export default BookingCard;
