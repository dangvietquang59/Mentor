'use client';
import bookingApi from '@/apis/bookingApi';
import BookingCard from '@/components/BookingCard';
import { BookingGetResponeType } from '@/types/response/booking';
import { UserType } from '@/types/user';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import useRequireAuth from '@/utils/hooks/useRequireAuth';
import { useEffect, useState } from 'react';

function BookingDetail() {
    const [booking, setBooking] = useState<BookingGetResponeType[]>([]);
    const profile: UserType = getProfile();
    const token = getAccessTokenClient();
    useRequireAuth(token);
    const fetchBooking = async () => {
        if (token && profile) {
            await bookingApi
                .getByUserId(profile?._id, token)
                .then((res) => {
                    if (res) {
                        setBooking(res);
                    }
                })
                .catch((errors) => console.log(errors));
        }
    };
    console.log(booking);
    useEffect(() => {
        fetchBooking();
    }, []);
    return (
        <div className="mx-[15%] mt-[2.4rem] min-h-[50rem] rounded-[0.8rem] bg-[#242526] p-[2rem]">
            <h2 className="text-[2.4rem] font-bold text-[#5DD62C]">
                Danh sách đặt lịch
            </h2>
            <div className="mt-[2.4rem] grid grid-cols-3 gap-[1.2rem]">
                {booking.length > 0 &&
                    token &&
                    booking?.map((item, index) => (
                        <BookingCard
                            key={index}
                            booking={item}
                            token={token}
                            refreshData={fetchBooking}
                        />
                    ))}
            </div>
        </div>
    );
}

export default BookingDetail;
