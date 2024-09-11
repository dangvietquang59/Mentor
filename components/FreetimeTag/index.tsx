import Image from 'next/image';
import icons from '@/assets/icons';
import { FreeTimeType } from '@/types/response/freetime';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
import freetimeApi from '@/apis/freetimeApi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import TimeItem from '../TimeItem';
import ButtonCustom from '../ButtonCustom';
import SelectComponent from '../Select';

interface FreetimeTagProps {
    sessions: FreeTimeType[];
    token: string;
    totalPages: number;
    setPage: (value: number) => void;
    page: number;
    canEdit?: boolean;
    forBooking?: boolean;
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
}: FreetimeTagProps) {
    const [sessionData, setSessionData] = useState<SessionData[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');

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

    useEffect(() => {
        setSessionData(formatData(sessions));
    }, [sessions]);

    const handleRemoveTag = async (id: string) => {
        await freetimeApi
            .delete(token, id)
            .then((res) => {
                console.log(res);
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
    function convertTo24Hour(time: string) {
        const [hour, minute] = time.split(':').map(Number);
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

    function generateTimeSlots(startTime: string, endTime: string) {
        const slots = [];
        let currentHour = parseInt(startTime.split(':')[0], 10);
        const endHour = parseInt(endTime.split(':')[0], 10);

        while (currentHour < endHour) {
            const time = `${currentHour.toString().padStart(2, '0')}:00`;
            slots.push(convertTo24Hour(time));
            currentHour++;
        }

        return slots;
    }
    const timeSlots = generateTimeSlots(
        selected?.startTime ?? '00:00',
        selected?.endTime ?? '00:00',
    );

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPagesTime = Math.ceil(timeSlots.length / itemsPerPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [selected?._id]);
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return timeSlots.slice(startIndex, endIndex);
    };
    const generateHourOptions = () => {
        const options = [];
        for (let i = 1; i <= 24; i++) {
            options.push({
                value: i,
                label: `${i} hour${i > 1 ? 's' : ''}`,
            });
        }
        return options;
    };
    if (forBooking) {
        return (
            <div className="flex flex-col gap-[1.2rem]">
                <div className="min-h-[32rem]">
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
                                    <p className="text-[1.6rem] font-medium">
                                        {`${item?.startTime} - ${item?.endTime}`}
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
                            <div className="flex items-center gap-[0.8rem]">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`${currentPage === 1 ? 'cursor-not-allowed opacity-70' : ' '}`}
                                >
                                    <Image
                                        src={icons.chevronDown}
                                        alt="icon"
                                        className="rotate-[90deg]"
                                    />
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPagesTime}
                                    className={`${currentPage === totalPagesTime ? 'cursor-not-allowed opacity-70' : ' '}`}
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
                            {getCurrentPageItems().length > 0 &&
                                getCurrentPageItems().map((item, index) => (
                                    <TimeItem
                                        name={item}
                                        key={index}
                                        isSelected={selectedTime}
                                        onSelected={setSelectedTime}
                                    />
                                ))}
                        </div>
                        {selectedTime.length > 0 && (
                            <div className="mt-[2.4rem]">
                                <h3 className="mb-[1.2rem] text-[2rem] font-bold">
                                    Temporary rental
                                </h3>
                                <SelectComponent
                                    name="jobTitle"
                                    options={generateHourOptions()}
                                    placeholder="Chọn chức danh công việc"
                                />
                            </div>
                        )}
                        <ButtonCustom className="mt-[2.4rem] h-[7rem] w-full text-[2rem] text-white">
                            Book session for 02 Jun 2024
                        </ButtonCustom>
                    </div>
                )}
            </div>
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
                                <p className="text-[1.6rem] font-medium">
                                    {`${item?.startTime} - ${item?.endTime}`}
                                </p>
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
