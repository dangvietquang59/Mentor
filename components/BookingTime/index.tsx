import FreetimeTag from '../FreetimeTag';
import { useEffect, useState } from 'react';
import { FreeTimeReponseType, FreeTimeType } from '@/types/response/freetime';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';

import freetimeApi from '@/apis/freetimeApi';
import ButtonCustom from '../ButtonCustom';
import paths from '@/utils/constants/paths';
import { getProfile } from '@/utils/functions/getProfile';
import { UserType } from '@/types/user';

interface BookingTimeProps {
    id: string;
}
function BookingTime({ id }: BookingTimeProps) {
    const [arraySession, setArraySession] = useState<FreeTimeType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const accessToken = getAccessTokenClient() || '';
    const profile: UserType = getProfile();
    const params = {
        page: currentPage,
    };
    useEffect(() => {
        const fetchFreetime = async () => {
            if (accessToken && id) {
                try {
                    const res: FreeTimeReponseType | undefined =
                        await freetimeApi.getById(accessToken, id, params);
                    if (res && Array.isArray(res.freetime)) {
                        setArraySession(res.freetime);
                        setTotalPages(res?.totalRecords);
                    } else {
                        console.error(
                            'Freetime không phải là mảng hoặc dữ liệu trả về không hợp lệ:',
                            res,
                        );
                    }
                } catch (error) {
                    console.error('Lỗi khi gọi API:', error);
                }
            }
        };

        fetchFreetime();
    }, [currentPage]);
    if (arraySession?.length === 0) {
        return (
            <div className="flex min-h-[40rem] items-center justify-center rounded-[0.4rem] bg-[#242526] p-[2rem]">
                <div className="flex flex-col items-center justify-center gap-[1.2rem]">
                    <p className="text-[1.8rem] font-medium">
                        There are no calendars displayed yet
                    </p>
                    {profile?._id === id && (
                        <ButtonCustom
                            path={`${paths.PROFILE}/${paths.EDIT}/${id}`}
                        >
                            Add new now
                        </ButtonCustom>
                    )}
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="min-h-[40rem] rounded-[0.4rem] bg-[#242526] p-[2rem]">
                <div className="mb-[2.4rem]">
                    <h2 className="text-[2rem] font-bold text-[#5DD62C]">
                        Available sessions
                    </h2>

                    <span className="text-[1.6rem] font-bold text-[#6B7B8A]">
                        Book 1:1 sessions from the options based on your needs
                    </span>
                </div>
                <div className="flex flex-col gap-[0.8rem]">
                    <FreetimeTag
                        sessions={arraySession}
                        token={accessToken}
                        totalPages={totalPages}
                        setPage={setCurrentPage}
                        page={currentPage}
                        forBooking
                    />
                </div>
            </div>
        </>
    );
}

export default BookingTime;
