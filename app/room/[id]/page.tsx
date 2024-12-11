'use client';

import bookingApi from '@/apis/bookingApi';
import VideoChat from '@/components/VideoChat';
import { BookingGetResponeType } from '@/types/response/booking';
import { UserType } from '@/types/user';
import paths from '@/utils/constants/paths';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import { useMounted } from '@/utils/hooks/useMounted';
import useRequireAuth from '@/utils/hooks/useRequireAuth';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MeetPage() {
    const params = useParams();
    const profile: UserType = getProfile();
    const token = getAccessTokenClient();
    const router = useRouter();
    const [room, setRoom] = useState<BookingGetResponeType>();
    const [countdown, setCountdown] = useState<number>(0);
    const [canJoin, setCanJoin] = useState<boolean>(false);
    const mounted = useMounted();

    // Lấy dữ liệu phòng
    const fetchRoom = async () => {
        if (token) {
            await bookingApi
                ?.getById(params?.id as string, token)
                .then((res) => {
                    if (res) {
                        setRoom(res);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        fetchRoom();
    }, [token]);

    useEffect(() => {
        if (room && profile) {
            const isParticipant = room?.participants?.some(
                (item) => item?._id === profile?._id,
            );
            if (!isParticipant) {
                router.push(paths.NOT_FOUND);
            }
        }
    }, [room, profile?._id]);

    useEffect(() => {
        if (room) {
            const now = new Date();
            const fromTime = new Date(
                `${new Date().toDateString()} ${room.from}`,
            );
            const toTime = new Date(`${new Date().toDateString()} ${room.to}`);

            if (now >= fromTime && now <= toTime) {
                setCanJoin(true);
            }

            const timeLeft = toTime.getTime() - now.getTime();
            setCountdown(timeLeft / 1000);
        }
    }, [room]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    router.push(paths.HOME);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useRequireAuth(token);

    const formatCountdown = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <>
            {mounted && (
                <div className="relative min-h-screen bg-gray-900">
                    <VideoChat
                        roomId={params.id as string}
                        userId={profile?._id}
                    />
                    {canJoin ? (
                        <div className="absolute bottom-[15%] left-[1%] rounded-[1rem] bg-[#ccc] p-[1rem] text-black">
                            <p>
                                Thời gian còn lại: {formatCountdown(countdown)}
                            </p>
                        </div>
                    ) : (
                        <div className="absolute bottom-[15%] left-[1%] rounded-[1rem] bg-[#ccc] p-[1rem] text-black">
                            <p>
                                Không thể vào phòng. Chờ đến thời gian bắt đầu.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
