import Image from 'next/image';
import icons from '@/assets/icons';
import { FreeTimeDetailType, FreeTimeType } from '@/types/response/freetime';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
import freetimeApi from '@/apis/freetimeApi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Modal, Pagination } from 'antd';
import ButtonCustom from '../ButtonCustom';
import { formatTime } from '@/utils/functions/formatTime';
import { UserType } from '@/types/user';
import { getProfile } from '@/utils/functions/getProfile';
import { formatDate } from '@/utils/functions/formatDate';
import { calculateTimeDifference } from '@/utils/functions/calculateTimeDifference';
import { formatNumeric } from '@/utils/functions/formatNumeric';
import bookingApi from '@/apis/bookingApi';

interface FreetimeTagProps {
    sessions: FreeTimeType[];
    token: string;
    totalPages: number;
    setPage: (value: number) => void;
    page: number;
    canEdit?: boolean;
    forBooking?: boolean;
    user: UserType;
}

interface SessionData extends FreeTimeType {
    formattedDate: {
        day: number;
        dayOfWeek: string;
        month: string;
        year: string;
    };
}

function FreetimeTag({
    sessions,
    token,
    totalPages,
    page,
    setPage,
    canEdit = true,
    forBooking = false,
    user,
}: FreetimeTagProps) {
    const [sessionData, setSessionData] = useState<SessionData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const profile: UserType = getProfile();

    const handleBooking = () => {
        if (!selectedSession) {
            toast.error('You have choose sesstion before booking');
        }
        showModal();
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleBookingSession = async () => {
        if (selectedSession && profile) {
            const data = {
                menteeId: profile?._id,
                mentorId: user?._id,
                freetimeDetailId: selectedSession?._id,
            };
            await bookingApi
                .create(data, token)
                .then((res) => {
                    if (res) {
                        toast.success('Booking session successful');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Booking session error');
                });
        }
    };
    const formatData = (data: any[]) => {
        return data.map((item) => {
            const formattedDate = getFormattedDate(new Date(item.freeDate));
            return {
                ...item,
                formattedDate,
            };
        });
    };
    const [selected, setSelected] = useState<SessionData | null>(null);
    const [selectedSession, setSelectedSession] =
        useState<FreeTimeDetailType | null>(null);
    useEffect(() => {
        setSessionData(formatData(sessions));
    }, [sessions]);

    const handleRemoveTag = async (id: string) => {
        await freetimeApi
            .delete(token, id)
            .then((res) => {
                if (res) {
                    setSessionData((prev) =>
                        prev.filter((item) => item._id !== id),
                    );
                    toast.success('Delete free time session successful');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Delete free time session failed');
            });
    };
    const handleClickSession = (item: SessionData) => {
        setSelected(item);
    };

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(1);
    }, [selected?._id]);

    if (forBooking) {
        return (
            <>
                <div className="flex flex-col gap-[1.2rem]">
                    <div className="mb-[2.4rem]">
                        <h2 className="text-[2rem] font-bold text-[#5DD62C]">
                            Available sessions
                        </h2>

                        <span className="text-[1.6rem] font-bold text-[#6B7B8A]">
                            Book 1:1 sessions from the options based on your
                            needs
                        </span>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-4 gap-[0.8rem]">
                            {sessionData?.length > 0 &&
                                sessionData.map((item, index) => (
                                    <div
                                        className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-[0.8rem] p-[1rem] ${selected?._id === item?._id ? 'border-[#5CD22C] bg-[#5CD22C] text-black' : 'border-[#ccc]'} border-[0.1rem] duration-300 hover:border-[#5CD22C] `}
                                        key={index}
                                        onClick={() => handleClickSession(item)}
                                    >
                                        <p className="text-[2rem] font-bold">
                                            {item?.formattedDate?.dayOfWeek}
                                        </p>
                                        <p className="text-[1.6rem] font-medium">
                                            {`${item?.formattedDate?.day} ${item?.formattedDate?.month} ${item?.formattedDate?.year}`}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <Pagination
                        defaultCurrent={page}
                        total={totalPages}
                        pageSize={12}
                        align="center"
                        onChange={(page) => setPage(page)}
                    />
                    {selected && (
                        <div className="mt-[2.4rem]">
                            <div className="flex items-center justify-between border-b-[0.1rem] border-b-[#ccc] p-[1rem]">
                                <span className="text-[2rem] font-bold">
                                    Available time slots
                                </span>
                                {/* <div className="flex items-center gap-[0.8rem]">
                                    <button
                                        disabled={currentPage === 1}
                                        className={`${currentPage === 1 ? 'cursor-not-allowed opacity-70' : ' '}`}
                                    >
                                        <Image
                                            src={icons.chevronDown}
                                            alt="icon"
                                            className="rotate-[90deg]"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src={icons.chevronDown}
                                            alt="icon"
                                            className="rotate-[-90deg]"
                                        />
                                    </button>
                                </div> */}
                            </div>
                            <div className="mt-[2.4rem] grid grid-cols-3 gap-[0.8rem]">
                                {selected?.freeTimeDetail?.length > 0 &&
                                    selected?.freeTimeDetail?.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className={`flex cursor-pointer flex-col gap-[0.4rem] rounded-[0.8rem] p-[1rem] ${selectedSession?._id === item?._id ? 'bg-[#5dd62c] text-black' : 'border'}`}
                                                onClick={() =>
                                                    setSelectedSession(item)
                                                }
                                            >
                                                <p className="text-[1.8rem] font-bold">
                                                    {item?.name}
                                                </p>
                                                <p className="text-[1.4rem] font-medium">
                                                    {formatTime(item?.from)} -{' '}
                                                    {formatTime(item?.to)}
                                                </p>
                                            </div>
                                        ),
                                    )}
                            </div>

                            {profile?._id !== user?._id && selectedSession && (
                                <ButtonCustom
                                    className="mt-[2.4rem] h-[7rem] w-full text-[2rem] text-white"
                                    onClick={handleBooking}
                                >
                                    Book session
                                </ButtonCustom>
                            )}
                        </div>
                    )}
                </div>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    centered
                >
                    <div className="flex flex-col gap-[2.4rem] text-white">
                        <h2 className="text-center text-[2rem] font-bold">
                            Booking Information
                        </h2>
                        <div className="flex flex-col gap-[1.2rem]">
                            <h3 className="text-[1.6rem] font-medium">
                                Booking date:
                            </h3>
                            {selected && (
                                <div className="flex items-center justify-between rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem]">
                                    <p className="text-[1.6rem] font-medium">
                                        {selected?.formattedDate?.dayOfWeek}
                                    </p>
                                    <p className="text-[1.4rem]">
                                        {formatDate(selected?.freeDate)}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-[1.2rem]">
                            <h3 className="text-[1.6rem] font-medium">Time:</h3>
                            {selectedSession && (
                                <div className="flex items-center justify-between rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem]">
                                    <p className="text-[1.6rem] font-medium">
                                        {selectedSession?.name}
                                    </p>
                                    <div className="flex items-center gap-[0.8rem]">
                                        <p className="text-[1.4rem]">
                                            {formatTime(selectedSession?.from)}
                                        </p>
                                        <span>-</span>
                                        <p className="text-[1.4rem]">
                                            {formatTime(selectedSession?.to)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {selectedSession && (
                            <div className="flex flex-col gap-[0.8rem]">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[1.6rem] font-medium">
                                        Total time :
                                    </h3>
                                    <p className="text-[1.6rem] font-medium">
                                        {calculateTimeDifference(
                                            formatTime(selectedSession?.from),
                                            formatTime(selectedSession?.to),
                                        )}{' '}
                                        hours
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[1.6rem] font-medium">
                                        Price per hour :
                                    </h3>
                                    <p className="text-[1.6rem] font-medium">
                                        {formatNumeric(user?.pricePerHour) || 0}
                                        đ
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[2rem] font-bold">
                                        Total price :
                                    </h3>
                                    <p className="text-[2rem] font-bold">
                                        {formatNumeric(
                                            user?.pricePerHour *
                                                calculateTimeDifference(
                                                    formatTime(
                                                        selectedSession?.from,
                                                    ),
                                                    formatTime(
                                                        selectedSession?.to,
                                                    ),
                                                ),
                                        ) || 0}
                                        đ
                                    </p>
                                </div>
                            </div>
                        )}
                        <ButtonCustom onClick={handleBookingSession}>
                            Book
                        </ButtonCustom>
                    </div>
                </Modal>
            </>
        );
    }
    return (
        <div className="flex flex-col gap-[1.2rem]">
            <div className="grid grid-cols-3 gap-[0.8rem]">
                {sessionData?.length > 0 &&
                    sessionData.map((item, index) => (
                        <div
                            className="group flex w-full items-center justify-between rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem]"
                            key={index}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-[0.8rem]">
                                    <p className="text-[2rem] font-bold">
                                        {item?.formattedDate?.dayOfWeek}
                                    </p>
                                    <p className="text-[1.6rem] font-medium">
                                        {`${item?.formattedDate?.day} ${item?.formattedDate?.month} ${item?.formattedDate?.year}`}
                                    </p>
                                </div>
                            </div>

                            {canEdit && (
                                <div className="flex items-center gap-[0.4rem]">
                                    <div className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.5)] p-[1rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                        <Image
                                            src={icons.editPen}
                                            alt="icon"
                                            className="size-[2rem]"
                                        />
                                    </div>
                                    <div
                                        className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.5)] p-[1rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                                        onClick={() =>
                                            handleRemoveTag(item?._id)
                                        }
                                    >
                                        <Image
                                            src={icons.trash}
                                            alt="icon"
                                            className="size-[2rem]"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <Pagination
                defaultCurrent={page}
                total={totalPages}
                pageSize={12}
                align="center"
                onChange={(page) => setPage(page)}
            />
        </div>
    );
}

export default FreetimeTag;
