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

interface BookingCardProps {
    booking: BookingGetResponeType;
    token: string;
    refreshData: () => void;
}
function BookingCard({ booking, token, refreshData }: BookingCardProps) {
    const profile: UserType = getProfile();
    const isMentor = profile?._id === booking?.participants?.[0]?._id;
    const [openReview, setOpenReview] = useState(false);

    const showReview = () => {
        setOpenReview(true);
    };
    const creatReview = () => {
        setOpenReview(true);
    };
    const cancleReview = () => {
        setOpenReview(false);
    };
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
        const data = {
            status,
        };
        await bookingApi
            .update(booking?._id, data, token)
            .then((res) => {
                if (res) {
                    toast.success('Update successfuly');
                    refreshData();
                }
            })
            .catch(() => toast.error('Update failed'));
    };
    const content = (
        <>
            <div className="flex w-[8rem] flex-col items-start justify-start gap-[1.2rem]">
                {booking?.status === 'Pending' && (
                    <>
                        {booking?.participants?.[0]?._id === profile?._id ? (
                            <>
                                <button
                                    className="flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-white hover:opacity-70"
                                    onClick={() =>
                                        handleUpdateBooking('Accepted')
                                    }
                                >
                                    <Image
                                        src={icons.check}
                                        alt="check-icon"
                                        className="w-[1.8rem]"
                                    />
                                    <p>Accept</p>
                                </button>
                                <button
                                    className="flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-white hover:opacity-70"
                                    onClick={() =>
                                        handleUpdateBooking('Refused')
                                    }
                                >
                                    <Image
                                        src={icons.xIcon}
                                        alt="check-icon"
                                        className="w-[1.8rem]"
                                    />
                                    <p>Refuse</p>
                                </button>
                            </>
                        ) : (
                            <button
                                className="flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-white hover:opacity-70"
                                onClick={() => handleUpdateBooking('Canceled')}
                            >
                                <Image
                                    src={icons.xIcon}
                                    alt="check-icon"
                                    className="w-[1.8rem]"
                                />
                                <p>Cancel</p>
                            </button>
                        )}
                    </>
                )}
                {booking?.status === 'Accepted' && (
                    <div className="flex flex-col gap-[0.8rem]">
                        <button
                            className="flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-white hover:opacity-70"
                            onClick={showReview}
                        >
                            <Image
                                src={icons.comment}
                                alt="check-icon"
                                className="w-[1.8rem]"
                            />
                            Review
                        </button>
                        <Link
                            href={`${paths.ROOM}/${booking?._id}`}
                            className="flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-white hover:opacity-70"
                        >
                            <Image
                                src={icons.video}
                                alt="check-icon"
                                className="w-[1.8rem]"
                            />
                            View
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
    return (
        <>
            <div className="flex min-h-[15rem] w-full flex-col gap-[1.2rem] rounded-[0.8rem] bg-[#0F0F0F] p-[1rem]">
                <div className="flex items-center justify-between">
                    {' '}
                    <h3 className="text-[1.6rem] font-bold uppercase">
                        {booking?.freetimeDetailId?.name}
                    </h3>
                    <Popover
                        content={booking?.status !== 'Refused' ? content : null}
                        placement="bottomRight"
                    >
                        <button>
                            <Image
                                src={icons.moreHorizontal}
                                alt="menu"
                                className="w-[2rem]"
                            />
                        </button>
                    </Popover>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[0.8rem]">
                        <p className="text-[1.4rem]">
                            {formatTime(booking?.freetimeDetailId?.from)}
                        </p>
                        <p className="text-[1.4rem]">-</p>
                        <p className="text-[1.4rem]">
                            {formatTime(booking?.freetimeDetailId?.to)}
                        </p>
                    </div>
                    <p className="text-[1.4rem]">
                        {formatDate(booking?.freetimeDetailId?.from)}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[0.8rem]">
                        <Avatar
                            src={
                                isMentor
                                    ? booking?.participants?.[1]?.imageUrl
                                    : booking?.participants?.[0]?.imageUrl
                            }
                            alt="avatar"
                            size={40}
                        />
                        <div className="">
                            <h4 className="text-[1.4rem] font-bold">
                                {isMentor
                                    ? booking?.participants?.[1]?.fullName
                                    : booking?.participants?.[0]?.fullName}
                            </h4>
                            <p className="text-[1.4rem] text-[#5DD62C]">
                                {isMentor
                                    ? 'Request to you'
                                    : booking?.status !== 'Accepted'
                                      ? 'Waiting confim'
                                      : ''}
                            </p>
                        </div>
                    </div>
                    <Tag
                        color={getStatusColor(booking?.status)}
                        className="w-fit"
                    >
                        {booking?.status}
                    </Tag>
                </div>
            </div>
            <ReviewModal
                bookingId={booking?._id}
                mentor={booking?.participants?.[0]}
                open={openReview}
                handleOk={creatReview}
                handleCancel={cancleReview}
            />
        </>
    );
}

export default BookingCard;
