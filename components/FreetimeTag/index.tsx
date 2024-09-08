import Image from 'next/image';
import icons from '@/assets/icons';
import { FreeTimeResponseType } from '@/types/response/freetime';
import { getFormattedDate } from '@/utils/functions/getFormattedDate';
interface FreetimeTagProps {
    sessions: FreeTimeResponseType[];
}
interface SessionData extends FreeTimeResponseType {
    formattedDate: {
        day: number;
        dayOfWeek: string;
        month: string;
        year: string;
    };
}
function FreetimeTag({ sessions }: FreetimeTagProps) {
    const formatData = (data: any[]) => {
        return data.map((item) => {
            const formattedDate = getFormattedDate(new Date(item.freeDate));
            return {
                ...item,
                formattedDate,
            };
        });
    };
    const sessionData: SessionData[] = formatData(sessions);
    return (
        <>
            {sessionData?.length > 0 &&
                sessionData?.map((item, index) => (
                    <div
                        className="group flex w-full items-center justify-between rounded-[0.8rem] bg-gradient-to-r from-[#03624c] to-[#5DD62C] p-[1rem]"
                        key={index}
                    >
                        <div className="flex flex-col">
                            <p className="text-[2rem] font-bold">
                                {item?.formattedDate?.dayOfWeek}
                            </p>
                            <p className="text-[1.8rem] font-medium">
                                {`${item?.formattedDate?.day} ${item?.formattedDate?.month} ${item?.formattedDate?.year}`}
                            </p>
                            <p className="text-[1.6rem] font-medium">
                                {`${item?.startTime} - ${item?.endTime}`}
                            </p>
                        </div>

                        <div className="flex items-center gap-[0.4rem]">
                            <div className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.5)] p-[1rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <Image
                                    src={icons.editPen}
                                    alt="icon"
                                    className="size-[2rem]"
                                />
                            </div>
                            <div className="cursor-pointer rounded-full bg-[rgba(255,255,255,0.5)] p-[1rem] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <Image
                                    src={icons.trash}
                                    alt="icon"
                                    className="size-[2rem]"
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default FreetimeTag;
