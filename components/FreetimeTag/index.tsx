import Image from 'next/image';
import icons from '@/assets/icons';
import { FreeTimeDetailType, FreeTimeType } from '@/types/response/freetime';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
import freetimeApi from '@/apis/freetimeApi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Avatar, Modal, Pagination, Select } from 'antd';
import ButtonCustom from '../ButtonCustom';
import { formatTime } from '@/utils/functions/formatTime';
import { UserType } from '@/types/user';
import { getProfile } from '@/utils/functions/getProfile';
import { formatDate } from '@/utils/functions/formatDate';
import { calculateTimeDifference } from '@/utils/functions/calculateTimeDifference';
import { formatNumeric } from '@/utils/functions/formatNumeric';
import bookingApi from '@/apis/bookingApi';
import images from '@/assets/img';
import userApi from '@/apis/userApi';
import { generateHours } from '@/utils/functions/generateHours';
import { CiCirclePlus } from 'react-icons/ci';
import ModalCoin from '@/components/ModalCoin';
import { parseNumber } from '@/utils/functions/parseNumber';
import { useChatStore } from '@/stores/useChatStore';
import { BookingGetResponeType } from '@/types/response/booking';
import groupChatApi from '@/apis/groupChatApi';
import { useRoomStore } from '@/stores/useRoomStore';
import { useArrRoomStore } from '@/stores/useArrRoomStore';
import { usePathname } from 'next/navigation';
import paths from '@/utils/constants/paths';

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
    const [me, setMe] = useState<UserType>();
    const [fromTime, setFromTime] = useState<string>('');
    const [toTime, setToTime] = useState<string>('');
    const [selected, setSelected] = useState<SessionData | null>(null);
    const pathname = usePathname();
    const mentorId = pathname.split(`${paths.PROFILE}/`)[1];

    const [selectedSession, setSelectedSession] =
        useState<FreeTimeDetailType | null>(null);
    const [openDispostit, setOpenDisposit] = useState(false);
    const { toggleChat } = useChatStore();

    const handleBooking = () => {
        if (!selectedSession) {
            toast.error('Bạn phải chọn lịch trước khi đặt');
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
    const fetchMe = async () => {
        await userApi
            .getMe(token)
            .then((res) => {
                if (res) {
                    setMe(res);
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchMe();
    }, [selectedSession]);
    const { setSelectedRoom } = useRoomStore();
    const { addRoom } = useArrRoomStore();

    const handleBookingSession = async () => {
        if (selectedSession && profile && user && me) {
            const data = {
                participants: [user._id, profile._id],
                freetimeDetailId: selectedSession._id,
            };

            try {
                const amount =
                    formatNumeric(
                        user?.pricePerHour *
                            calculateTimeDifference(fromTime, toTime),
                    ) || '0';

                if (me?.coin > parseNumber(amount)) {
                    const newData = {
                        ...data,
                        amount: parseNumber(amount),
                        from: fromTime,
                        to: toTime,
                    };
                    const res = await bookingApi.create(newData, token);
                    if (res) {
                        toast.success('Đặt lịch thành công!');
                        if (!mentorId && !profile) return;
                        const dataChat = {
                            name: '',
                            members: [mentorId, profile?._id].filter(
                                (id) => id !== undefined,
                            ) as string[],
                        };

                        try {
                            const res = await groupChatApi.getById(
                                token,
                                profile?._id,
                            );

                            if (res) {
                                const room = res?.find((item) =>
                                    item?.members?.some(
                                        (member) => member?._id === mentorId,
                                    ),
                                );

                                if (room) {
                                    toggleChat();
                                    setSelectedRoom(room);
                                    addRoom(room);
                                } else {
                                    const createdRoom =
                                        await groupChatApi.create(
                                            dataChat,
                                            token,
                                        );
                                    if (createdRoom) {
                                        toggleChat();
                                        setSelectedRoom(createdRoom);
                                        addRoom(createdRoom);
                                    }
                                }
                            }
                        } catch (error) {
                            console.error(
                                'Lỗi khi kiểm tra hoặc tạo phòng chat:',
                                error,
                            );
                        }
                        toast.success('Đặt lịch thành công');
                        handleOk();
                        toggleChat();
                    }
                } else {
                    toast.error('Số dư không đủ');
                }
            } catch (error) {
                console.log(error);
                toast.error('Đặt lịch thất bại');
            }
        } else {
            // Optionally handle the case where required variables aren't defined
            toast.error('Thiếu thông tin bắt buộc để đặt chỗ');
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
                    toast.success('Xóa lịch thành công');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Xóa lịch thất bại');
            });
    };
    const handleClickSession = (item: SessionData) => {
        setSelected(item);
    };

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(1);
    }, [selected?._id]);
    const itemsPerPage = 6;

    const total = Math.ceil(
        (selected?.freeTimeDetail?.length ?? 0) / itemsPerPage,
    );

    // Get the sessions for the current page
    const displayedSessions = selected?.freeTimeDetail?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Handle next and previous page
    const handleNextPage = () => {
        if (currentPage < total) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    let arrOptions: any[] = [];
    if (selectedSession) {
        arrOptions = generateHours(
            formatTime(selectedSession?.from),
            formatTime(selectedSession?.to),
        );
    }
    const handleChangeFrom = (value: string) => {
        setFromTime(value);
    };
    const handleChangeTo = (value: string) => {
        setToTime(value);
    };
    const showModalCoin = () => {
        setOpenDisposit(true);
    };

    if (forBooking) {
        return (
            <>
                <div className="flex flex-col gap-[1.2rem]">
                    {user?.role === 'Mentor' && (
                        <div className="mb-[2.4rem]">
                            <h2 className="text-[2rem] font-bold text-[#5DD62C]">
                                Lịch học
                            </h2>
                            <span className="text-[1.6rem] font-bold text-[#6B7B8A]">
                                Đặt các buổi học 1:1 từ các tùy chọn dựa trên
                                nhu cầu của bạn
                            </span>
                            <div>
                                <div className="grid grid-cols-4 gap-[0.8rem]">
                                    {sessionData?.length > 0 &&
                                        sessionData.map((item, index) => (
                                            <div
                                                className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-[0.8rem] p-[1rem] ${
                                                    selected?._id === item?._id
                                                        ? 'border-[#5CD22C] bg-[#5CD22C] text-black'
                                                        : 'border-[#ccc]'
                                                } border-[0.1rem] duration-300 hover:border-[#5CD22C]`}
                                                key={index}
                                                onClick={() =>
                                                    handleClickSession(item)
                                                }
                                            >
                                                <p className="text-[2rem] font-bold">
                                                    {
                                                        item?.formattedDate
                                                            ?.dayOfWeek
                                                    }
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
                        </div>
                    )}

                    {selected && (
                        <div className="mt-[2.4rem]">
                            <div className="flex items-center justify-between border-b-[0.1rem] border-b-[#ccc] p-[1rem]">
                                <span className="text-[2rem] font-bold">
                                    Thời gian
                                </span>
                                <div className="flex items-center gap-[0.8rem]">
                                    <button
                                        disabled={currentPage === 1}
                                        className={`${currentPage === 1 ? 'cursor-not-allowed opacity-70' : ''}`}
                                        onClick={handlePrevPage}
                                    >
                                        <Image
                                            src={icons.chevronDown}
                                            alt="icon"
                                            className="rotate-[90deg]"
                                        />
                                    </button>
                                    <button
                                        disabled={currentPage === total}
                                        className={`${currentPage === total ? 'cursor-not-allowed opacity-70' : ''}`}
                                        onClick={handleNextPage}
                                    >
                                        <Image
                                            src={icons.chevronDown}
                                            alt="icon"
                                            className="rotate-[-90deg]"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-[2.4rem] grid grid-cols-3 gap-[0.8rem]">
                                {displayedSessions &&
                                    displayedSessions?.length > 0 &&
                                    displayedSessions.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex cursor-pointer flex-col gap-[0.4rem] rounded-[0.8rem] p-[1rem] ${
                                                selectedSession?._id ===
                                                item?._id
                                                    ? 'bg-[#5dd62c] text-black'
                                                    : 'border'
                                            } ${item?.availableTimes?.length > 0 ? 'block' : 'hidden'}`}
                                            onClick={() =>
                                                setSelectedSession(item)
                                            }
                                        >
                                            <p className="text-[1.8rem] font-bold">
                                                {item?.name}
                                            </p>
                                            {item?.availableTimes?.length > 0 &&
                                                item?.availableTimes?.map(
                                                    (itemAvailabel, index1) => (
                                                        <p
                                                            className="text-[1.4rem] font-medium"
                                                            key={index1}
                                                        >
                                                            {
                                                                itemAvailabel?.from
                                                            }{' '}
                                                            -{' '}
                                                            {itemAvailabel?.to}
                                                        </p>
                                                    ),
                                                )}
                                        </div>
                                    ))}
                            </div>

                            {profile?._id !== user?._id && selectedSession && (
                                <ButtonCustom
                                    className="mt-[2.4rem] h-[7rem] w-full text-[2rem] text-white"
                                    onClick={handleBooking}
                                >
                                    Đặt lịch
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
                    <div className="flex flex-col gap-[1.2rem] text-white">
                        <h2 className="border-b py-[1rem] text-center text-[2rem] font-bold">
                            Thông tin đặt lịch
                        </h2>
                        <div className="flex items-center gap-[1rem]">
                            <Avatar src={user?.imageUrl} size={50} />
                            <span>{user?.fullName}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-[1.2rem]">
                            <h3 className="text-[1.6rem] font-medium">
                                Ngày đặt:
                            </h3>
                            {selected && (
                                <div className="flex items-center justify-between p-[1rem]">
                                    <p className="text-[1.6rem] font-medium">
                                        {selected?.formattedDate?.dayOfWeek}
                                    </p>
                                    {'-'}
                                    <p className="text-[1.4rem]">
                                        {formatDate(selected?.freeDate)}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-[1.2rem]">
                            <h3 className="text-[1.6rem] font-medium">
                                Thời gian đặt:
                            </h3>
                            {selectedSession && (
                                <div className="flex items-center gap-[1rem]">
                                    <Select
                                        className="w-full"
                                        onChange={handleChangeFrom}
                                        options={
                                            arrOptions?.length > 0
                                                ? arrOptions.map((item) => ({
                                                      value: item,
                                                      label: item,
                                                  }))
                                                : []
                                        }
                                    />
                                    <span>-</span>
                                    <Select
                                        className="w-full"
                                        onChange={handleChangeTo}
                                        options={
                                            arrOptions?.length > 0
                                                ? arrOptions.map((item) => ({
                                                      value: item,
                                                      label: item,
                                                  }))
                                                : []
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        {selectedSession && (
                            <div className="flex flex-col gap-[1.2rem]">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[1.6rem] font-medium">
                                        Giá cho mỗi giờ :
                                    </h3>
                                    <div className="flex items-center gap-[0.8rem]">
                                        <p className="text-[1.6rem] font-medium">
                                            {formatNumeric(
                                                user?.pricePerHour,
                                            ) || 0}
                                        </p>
                                        <Image
                                            src={images.qCoin}
                                            alt="coin"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[1.6rem] font-medium">
                                        Số dư hiện tại :
                                    </h3>
                                    <div className="flex items-center gap-[0.8rem]">
                                        <button onClick={showModalCoin}>
                                            <CiCirclePlus className="size-[2rem]" />
                                        </button>
                                        <p className="text-[1.6rem] font-medium">
                                            {(me && formatNumeric(me?.coin)) ||
                                                0}
                                        </p>
                                        <Image
                                            src={images.qCoin}
                                            alt="coin"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[2rem] font-bold">
                                        Tổng tiền :
                                    </h3>
                                    <div className="flex items-center gap-[0.8rem]">
                                        <p className="text-[2rem] font-bold">
                                            {(fromTime &&
                                                toTime &&
                                                formatNumeric(
                                                    user?.pricePerHour *
                                                        calculateTimeDifference(
                                                            fromTime,
                                                            toTime,
                                                        ),
                                                )) ||
                                                0}
                                        </p>
                                        <Image
                                            src={images.qCoin}
                                            alt="coin"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <ButtonCustom onClick={handleBookingSession}>
                            Đặt ngay
                        </ButtonCustom>
                    </div>
                </Modal>
                <ModalCoin
                    open={openDispostit}
                    handleCancel={() => {
                        setOpenDisposit(false);
                    }}
                    handleOk={() => setOpenDisposit(true)}
                />
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
