import Image from 'next/image';
import icons from '@/assets/icons';
import { FreeTimeType } from '@/types/response/freetime';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
import freetimeApi from '@/apis/freetimeApi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

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
    if (forBooking) {
        const [selected, setSelected] = useState<string | null>(null);
        return (
            <div className="flex flex-col gap-[1.2rem]">
                <div className="min-h-[32rem]">
                    <div className="grid grid-cols-4 gap-[0.8rem]">
                        {sessionData?.length > 0 &&
                            sessionData.map((item, index) => (
                                <div
                                    className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-[0.8rem] p-[1rem] ${selected === item?._id ? 'border-[#5CD22C] text-[#5CD22C]' : 'border-[#ccc]'} border-[0.2rem] duration-300 hover:border-[#5CD22C] `}
                                    key={index}
                                    onClick={() => setSelected(item?._id)}
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
