import Image from 'next/image';
import TimeItem from '../TimeItem';
import icons from '@/assets/icons';
import ButtonCustom from '../ButtonCustom';
import FreetimeTag from '../FreetimeTag';
import { useEffect, useState } from 'react';
import { FreeTimeReponseType, FreeTimeType } from '@/types/response/freetime';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { UserType } from '@/types/user';
import { getProfile } from '@/utils/functions/getProfile';
import freetimeApi from '@/apis/freetimeApi';

function BookingTime() {
    const [arraySession, setArraySession] = useState<FreeTimeType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const accessToken = getAccessTokenClient();
    const profile: UserType = getProfile();
    const params = {
        page: currentPage,
    };
    useEffect(() => {
        const fetchFreetime = async () => {
            if (accessToken && profile?._id) {
                try {
                    const res: FreeTimeReponseType | undefined =
                        await freetimeApi.getById(
                            accessToken,
                            profile._id,
                            params,
                        );
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
                    {accessToken && (
                        <FreetimeTag
                            sessions={arraySession}
                            token={accessToken}
                            totalPages={totalPages}
                            setPage={setCurrentPage}
                            page={currentPage}
                            forBooking
                        />
                    )}
                </div>
                <div className="mt-[2.4rem]">
                    <div className="flex items-center justify-between border-b-[0.1rem] border-b-[#ccc] p-[1rem]">
                        <span className="text-[2rem] font-bold">
                            Available time slots
                        </span>
                        <button>
                            <Image
                                src={icons.chevronDown}
                                alt="icon"
                                className="rotate-[-90deg]"
                            />
                        </button>
                    </div>
                    <div className="mt-[2.4rem] grid grid-cols-3 gap-[0.8rem]">
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                        <TimeItem />
                    </div>
                    <ButtonCustom className="mt-[2.4rem] h-[7rem] w-full text-[2rem] text-white">
                        Book session for 02 Jun 2024
                    </ButtonCustom>
                </div>
            </div>
        </>
    );
}

export default BookingTime;
