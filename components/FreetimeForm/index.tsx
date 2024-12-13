import icons from '@/assets/icons';
import { DatePicker, Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InputComponent from '../Input';
import ButtonCustom from '../ButtonCustom';
import { useForm } from 'react-hook-form';
import DatePickerComponent from '../DatePicker';
import SelectComponent from '../Select';
import { toast } from 'sonner';
import freetimeApi from '@/apis/freetimeApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useGetIdFromUrl } from '@/utils/functions/getIdUrl';
import { FreeTimeType } from '@/types/response/freetime';
import { formatDate } from '@/utils/functions/formatDate';
import { formatTime } from '@/utils/functions/formatTime';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { FaTrashAlt } from 'react-icons/fa';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { FaPenToSquare } from 'react-icons/fa6';
// Function to generate a list of 24-hour time slots
export function generate24Hours(): string[] {
    const hours: string[] = [];
    for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        hours.push(hour);
    }
    return hours;
}

// Generate time slots
const time = generate24Hours();

interface FreetimeSessions {
    date: string;
    freetimeDetail: FreetimeSessionDetails[];
}

export type FreetimeSessionDetails = {
    name: string;
    from: string;
    to: string;
};
interface FreeTimeSectionsProps {
    sections: FreeTimeType;
    showIcon?: boolean;
    onDelete: (value: string) => void;
    confirm: () => void;
}
const FreeTimeSections = ({
    sections,
    showIcon = true,
    onDelete,
    confirm,
}: FreeTimeSectionsProps) => {
    return (
        <ul className="grid grid-cols-3 gap-[1.2rem]">
            {sections?.freeTimeDetail?.length > 0 &&
                sections?.freeTimeDetail?.map((item, index) => (
                    <li
                        key={index}
                        className="group flex items-center justify-between rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem] text-[1.4rem]"
                    >
                        <div className="flex flex-col gap-[0.8rem]">
                            <p className="text-[1.6rem] font-bold">
                                {item?.name}
                            </p>
                            <span>
                                {formatTime(item?.from)} -{' '}
                                {formatTime(item?.to)}
                            </span>
                        </div>
                        {showIcon && (
                            <div
                                className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.5)] p-[1rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                                onClick={() => {
                                    onDelete(item?._id);
                                    confirm();
                                }}
                            >
                                <Image
                                    src={icons.trash}
                                    alt="icon"
                                    className="size-[2rem]"
                                />
                            </div>
                        )}
                    </li>
                ))}
        </ul>
    );
};
function FreetimeForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sessionDetail, setSessionDetail] = useState<
        FreetimeSessionDetails[]
    >([]);

    const [dateRange, setDateRange] = useState<
        [Dayjs | null, Dayjs | null] | null
    >(null);
    const userId = useGetIdFromUrl();
    const [sessions, setSessions] = useState<FreeTimeType[]>([]);
    const [showInputs, setShowInputs] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedFreetimeDetail, setSelectedFreetimeDetail] =
        useState<string>('');
    const [currentDetail, setCurrentDetail] = useState<FreetimeSessionDetails>({
        name: '',
        from: '',
        to: '',
    });
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const daysOfWeek = [
        { label: 'Chủ Nhật', value: 0 },
        { label: 'Thứ Hai', value: 1 },
        { label: 'Thứ Ba', value: 2 },
        { label: 'Thứ Tư', value: 3 },
        { label: 'Thứ Năm', value: 4 },
        { label: 'Thứ Sáu', value: 5 },
        { label: 'Thứ Bảy', value: 6 },
    ];
    const toggleDaySelection = (day: number) => {
        setSelectedDays(
            (prev) =>
                prev.includes(day)
                    ? prev.filter((d) => d !== day) // Bỏ chọn ngày nếu đã được chọn
                    : [...prev, day], // Thêm ngày nếu chưa được chọn
        );
    };
    const isDaySelected = (day: number) => selectedDays.includes(day);
    const handleDateChange: RangePickerProps['onChange'] = (
        dates,
        dateStrings,
    ) => {
        setDateRange(dates);
    };
    const [showConfirm, setShowConfirm] = useState(false);
    const token = getAccessTokenClient();

    // const generateSessions = (
    //     from: string,
    //     to: string,
    // ): FreetimeSessionDetails[] => {
    //     const sessions: FreetimeSessionDetails[] = [];

    //     // Chuyển từ chuỗi thời gian 'hh:mm' thành đối tượng Date
    //     const fromTime = new Date(`1970-01-01T${from}:00`);
    //     const toTime = new Date(`1970-01-01T${to}:00`);

    //     let sessionIndex = 1;
    //     while (fromTime < toTime) {
    //         // Định dạng thời gian theo định dạng 24 giờ (HH:mm)
    //         const startTime = fromTime.toTimeString().slice(0, 5); // Lấy 5 ký tự đầu "HH:mm"
    //         fromTime.setHours(fromTime.getHours() + 1); // Tăng giờ lên 1
    //         const endTime = fromTime.toTimeString().slice(0, 5); // Lấy 5 ký tự đầu "HH:mm"

    //         sessions.push({
    //             name: `Meeting ${startTime}-${endTime}`,
    //             from: startTime,
    //             to: endTime,
    //         });

    //         sessionIndex++;
    //     }

    //     return sessions;
    // };

    const showConfirmModal = () => {
        setShowConfirm(true);
    };
    const cancelConfirmModal = () => {
        setShowConfirm(false);
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

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FreetimeSessions>();
    const params = {
        page: currentPage,
    };
    const fetchSessions = async () => {
        if (token && userId) {
            try {
                const res = await freetimeApi.getById(token, userId, params);
                if (res && Array.isArray(res.freetime)) {
                    setSessions(res.freetime);
                } else {
                    console.error('Invalid response structure', res);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        } else {
            console.warn('User ID or token is missing');
        }
    };
    useEffect(() => {
        fetchSessions();
    }, [currentPage]);
    const generateDaysInRange = (
        startDate: string,
        endDate: string,
    ): string[] => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        const dates = [];

        let currentDate = start;

        while (currentDate.isBefore(end) || currentDate.isSame(end)) {
            dates.push(currentDate.format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'day');
        }

        return dates;
    };

    const onSubmit = async (data: FreetimeSessions) => {
        if (token) {
            const arrSessions = sessionDetail;
            console.log('🚀 ~ onSubmit ~ arrSessions:', arrSessions);

            const arrDate = dateRange
                ? generateDaysInRange(
                      dateRange[0]?.toISOString() ?? '',
                      dateRange[1]?.toISOString() ?? '',
                  )
                : [];

            if (arrDate?.length > 0) {
                const promises = arrDate.map((date) => {
                    const newData = {
                        freeDate: date,
                        freeTimeDetail: arrSessions,
                        repeatDays: selectedDays || [],
                    };

                    return freetimeApi
                        .create(newData, token)
                        .then((response) => {
                            if (response) {
                                toast.success(
                                    `Tạo lịch cho ${date} thành công`,
                                );
                                setSessions((prevData) => [
                                    ...prevData,
                                    response,
                                ]);
                            }
                        })
                        .catch(() => {
                            toast.error(
                                `Ngày mới tạo (${date}) trùng với ngày đã tạo trước đó`,
                            );
                        });
                });

                // Chờ tất cả các promises hoàn thành
                await Promise.all(promises);

                reset();
                handleOk();
                setSessionDetail([]);
            }
        }
    };

    const isTimeSlotValid = (from: string, to: string) => {
        if (from >= to) {
            return false;
        }
        return !sessionDetail.some(
            (detail) => from < detail.to && to > detail.from,
        );
    };

    const handleAddDetail = () => {
        if (!currentDetail.name || !currentDetail.from || !currentDetail.to) {
            toast.error('Vui lòng điền vào tất cả các trường');
            return;
        }

        if (!isTimeSlotValid(currentDetail.from, currentDetail.to)) {
            toast.error(
                'Khoảng thời gian trùng lặp với các phiên hiện có hoặc không hợp lệ',
            );
            return;
        }

        setSessionDetail((prev) => [...prev, currentDetail]);
        setCurrentDetail({ name: '', from: '', to: '' });
        setShowInputs(false);
    };
    const handleRemoveDetail = async () => {
        if (token && selectedFreetimeDetail) {
            await freetimeApi
                .deleteDetails(token, selectedFreetimeDetail)
                .then((res) => {
                    if (res) {
                        toast.success('Xóa lịch thành công');
                    }
                })
                .catch(() => toast.error('Xóa lịch thất bại'));
        }
    };
    const handleDeleteSession = (index: number) => {
        const newSessionDetail = sessionDetail.filter((_, i) => i !== index);
        setSessionDetail(newSessionDetail);
    };
    const [currentPageSessions, setCurrentPageSessions] = useState(1); // Trang hiện tại
    const itemsPerPage = 6; // Số item mỗi trang

    // Tính toán các session cần hiển thị dựa trên currentPage
    const totalPages = Math.ceil(sessions?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSessions = sessions.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    // Hàm thay đổi trang
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    console.log('sessions', sessions);
    return (
        <>
            <div className="flex max-h-[50rem] min-h-[40rem] flex-col gap-[2.4rem] overflow-y-auto rounded-[0.8rem] bg-[#242526] p-[2rem]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[2.4rem] font-bold text-[#5dd62c]">
                        Danh sách lịch rảnh
                    </h2>
                    <ButtonCustom onClick={showModal}>Thêm lịch</ButtonCustom>
                </div>

                {sessions?.length > 0 &&
                    sessions?.map((item, index) => (
                        <div className="flex flex-col gap-[1.2rem]">
                            <div className="flex items-center justify-between">
                                <span className="text-[2rem] font-medium">
                                    {item?.freeDate &&
                                        formatDate(item?.freeDate)}
                                </span>
                                <button className="duration-300 hover:opacity-70">
                                    <FaPenToSquare className="size-[2rem]" />
                                </button>
                            </div>
                            <FreeTimeSections
                                sections={item}
                                key={index}
                                onDelete={setSelectedFreetimeDetail}
                                confirm={showConfirmModal}
                            />
                        </div>
                    ))}
            </div>
            <ConfirmDeleteModal
                content="Bạn có muốn xóa lịch học này không?"
                isModalOpen={showConfirm}
                handleCancel={cancelConfirmModal}
                handleOk={handleRemoveDetail}
            />
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                centered
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[2.4rem]"
                >
                    {/* <DatePickerComponent
                        name="date"
                        control={control}
                        label="Select a date"
                        isRequired={true}
                        errors={errors.date}
                        rules={{ required: 'Date is required' }}
                    /> */}
                    <div className="mt-4">
                        <h4 className="mb-[1rem] text-[1.6rem] text-white">
                            Chọn khoảng ngày
                        </h4>
                        <DatePicker.RangePicker
                            onChange={handleDateChange}
                            value={dateRange}
                            className="w-full rounded-[0.4rem] bg-white p-[1rem] text-black"
                            format="YYYY-MM-DD"
                        />
                    </div>
                    <div className="flex flex-col gap-[1.6rem]">
                        {sessionDetail.map((detail, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg bg-[#1d1d1d] p-[1rem] shadow-md transition-all hover:shadow-xl"
                            >
                                <div className="flex flex-col">
                                    <div className="text-[1.6rem] font-semibold text-white">
                                        {detail.name}
                                    </div>
                                    <div className="text-[1.4rem] text-gray-400">
                                        {detail.from} - {detail.to}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteSession(index)}
                                    className="text-red-500 transition-colors hover:text-red-700"
                                >
                                    <FaTrashAlt size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Input Fields */}
                    {showInputs && (
                        <div className="flex flex-col gap-[0.8rem]">
                            <InputComponent
                                name="name"
                                label="Tên khoảng thời gian"
                                placeholder="Khoảng 1, khoảng 2"
                                value={currentDetail.name}
                                onChange={(e: any) =>
                                    setCurrentDetail({
                                        ...currentDetail,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <div className="grid grid-cols-2 gap-[0.8rem]">
                                {/* Select for "From" Time */}
                                <div className="flex flex-col gap-[1.2rem]">
                                    <h3 className="font-medium text-white">
                                        Từ
                                    </h3>
                                    <SelectComponent
                                        name="from"
                                        options={time.map((item) => ({
                                            value: item,
                                            label: item,
                                        }))}
                                        placeholder="Chọn giờ bắt đầu"
                                        value={currentDetail.from}
                                        onChange={(value: any) =>
                                            setCurrentDetail({
                                                ...currentDetail,
                                                from: value,
                                            })
                                        }
                                    />
                                </div>
                                {/* Select for "To" Time */}
                                <div className="flex flex-col gap-[1.2rem]">
                                    <h3 className="font-medium text-white">
                                        Đến
                                    </h3>
                                    <SelectComponent
                                        name="to"
                                        options={time.map((item) => ({
                                            value: item,
                                            label: item,
                                        }))}
                                        placeholder="Chọn giờ kết thúc"
                                        value={currentDetail.to}
                                        onChange={(value: any) =>
                                            setCurrentDetail({
                                                ...currentDetail,
                                                to: value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddDetail}
                                className="mt-[1rem] flex w-full items-center justify-center gap-[0.8rem] rounded-[0.8rem] border-[0.1rem] border-[#5dd62c] p-[1rem] text-white"
                            >
                                <Image src={icons.plus} alt="icon" />
                                <span className="text-[1.6rem]">
                                    Thêm vào danh sách
                                </span>
                            </button>
                        </div>
                    )}

                    {!showInputs && (
                        <button
                            type="button"
                            onClick={() => setShowInputs(true)}
                            className="flex w-full items-center justify-center gap-[0.8rem] rounded-[0.8rem] border-[0.1rem] border-[#5dd62c] p-[1rem] text-white"
                        >
                            <Image src={icons.plus} alt="icon" />
                            <span className="text-[1.6rem]">
                                Thêm khoảng thời gian rảnh
                            </span>
                        </button>
                    )}
                    <h3 className="text-white">Lặp lại theo ngày trong tuần</h3>
                    <div className="grid grid-cols-4 gap-[0.8rem]">
                        {daysOfWeek.map((day) => (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleDaySelection(day.value)}
                                className={`rounded-lg px-4 py-2 text-white ${
                                    isDaySelected(day.value)
                                        ? 'bg-green-500'
                                        : 'bg-gray-500'
                                } hover:bg-green-600`}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                    <ButtonCustom type="submit">Lưu</ButtonCustom>
                </form>
            </Modal>
        </>
    );
}

export default FreetimeForm;
