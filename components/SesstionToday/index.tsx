import bookingApi from '@/apis/bookingApi';
import icons from '@/assets/icons';
import { BookingGetResponeType } from '@/types/response/booking';
import { UserType } from '@/types/user';
import paths from '@/utils/constants/paths';
import { formatTime } from '@/utils/functions/formatTime';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function SesionToday() {
    const [sessions, setSessions] = useState<BookingGetResponeType[] | null>(
        null,
    );
    const profile: UserType = getProfile();
    const token = getAccessTokenClient();
    useEffect(() => {
        if (token) {
            const fetchSessions = async () => {
                await bookingApi
                    .getByUserId(profile?._id, token)
                    .then((res) => {
                        if (res) {
                            setSessions(res);
                        }
                    })
                    .catch((error) => console.log(error));
            };
            fetchSessions();
        }
    }, [profile?._id]);

    return (
        <div className="rounded-[0.8rem] p-[1rem] text-white">
            <div className="flex items-center justify-between border-b p-[1rem]">
                <div className="flex items-center gap-[0.8rem]">
                    <Image
                        src={icons.calendar}
                        alt="icon"
                        className="h-[1.5rem] w-[1.5rem]"
                    />
                    <h2 className="text-[1.6rem] font-bold">Session today</h2>
                </div>
            </div>
            <div className="mt-[2.4rem] flex flex-col gap-[2.4rem]">
                <ul className="flex flex-col gap-[1.2rem]">
                    {sessions && sessions?.length > 0 ? (
                        sessions.map((item, index) => (
                            <li key={index}>
                                <Link href={`${paths.ROOM}/${item?._id}`}>
                                    <div className="flex items-center gap-[0.8rem] duration-300 hover:text-[#5dd62c]">
                                        <span className="grow p-[1rem] text-[1.4rem] font-bold">
                                            {item?.freetimeDetailId?.name}
                                        </span>
                                        <div className="flex items-center gap-[0.8rem]">
                                            <span className="rounded-[0.8rem] bg-gradient-to-r from-[#355429] to-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white">
                                                {formatTime(
                                                    item?.freetimeDetailId
                                                        ?.from,
                                                )}{' '}
                                                -{' '}
                                                {formatTime(
                                                    item?.freetimeDetailId?.to,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <div className="flex items-center justify-center">
                            <p className="text-[1.6rem]">
                                No section booking found
                            </p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SesionToday;
