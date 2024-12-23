'use client';
import bookingApi from '@/apis/bookingApi';
import BookingCard from '@/components/BookingCard';
import Tabs from '@/components/Tabs';
import { BookingGetResponeType } from '@/types/response/booking';
import { TabType } from '@/types/tab';
import { UserType } from '@/types/user';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import { useMounted } from '@/utils/hooks/useMounted';
import useRequireAuth from '@/utils/hooks/useRequireAuth';
import { useEffect, useState } from 'react';

function BookingDetail() {
    const [booking, setBooking] = useState<BookingGetResponeType[]>([]);
    const profile: UserType = getProfile();
    const token = getAccessTokenClient();
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const mounted = useMounted();

    // Filter bookings based on status
    const arrCanceled = booking.filter((item) => item?.status === 'Canceled');
    const arrAccepted = booking.filter((item) => item?.status === 'Accepted');
    const arrPending = booking.filter((item) => item?.status === 'Pending');

    // Filter the array based on selectedTab
    const filteredBookings =
        selectedTab === 0
            ? booking
            : selectedTab === 1
              ? arrPending
              : selectedTab === 2
                ? arrAccepted
                : selectedTab === 3
                  ? arrCanceled
                  : [];

    const arrayTabs: TabType[] = [
        { title: 'Tất cả' },
        { title: 'Chờ chấp nhận' },
        { title: 'Đã chấp nhận' },
        { title: 'Hủy' },
    ];

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

    useEffect(() => {
        fetchBooking();
    }, []);

    if (token)
        return (
            <>
                {mounted && (
                    <div className="mx-[15%] mt-[2.4rem] min-h-[50rem] rounded-[0.8rem] bg-[#242526] p-[2rem]">
                        <Tabs
                            arrayTabs={arrayTabs}
                            onSelectTab={setSelectedTab}
                            className="text-[1.8rem]"
                        />
                        <div className="mt-[2.4rem] grid grid-cols-1 gap-[1.2rem]">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((item, index) => (
                                    <BookingCard
                                        key={index}
                                        booking={item}
                                        token={token}
                                        refreshData={fetchBooking}
                                    />
                                ))
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <p className="text-[1.8rem]">
                                        Chưa có lịch đặt
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
}

export default BookingDetail;
