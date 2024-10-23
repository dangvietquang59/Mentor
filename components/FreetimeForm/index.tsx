import icons from '@/assets/icons';
import { Modal } from 'antd';
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
    onDelete: () => void;
}
const FreeTimeSections = ({
    sections,
    showIcon = true,
    onDelete,
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
                                onClick={onDelete}
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
    const [showConfirm, setShowConfirm] = useState(false);
    const token = getAccessTokenClient();

    const showConfirmModal = (id: string) => {
        setShowConfirm(true);
        setSelectedFreetimeDetail(id);
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
    useEffect(() => {
        const fetchSessions = async () => {
            if (token && userId) {
                try {
                    const res = await freetimeApi.getById(
                        token,
                        userId,
                        params,
                    );
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

        fetchSessions();
    }, [currentPage]);

    const onSubmit = async (data: FreetimeSessions) => {
        if (token) {
            const newData = {
                freeDate: data?.date,
                freeTimeDetail: sessionDetail,
            };
            await freetimeApi
                .create(newData, token)
                .then((res) => {
                    if (res) {
                        toast.success('Create new session succesfull');
                        setSessions((prevData) => [...prevData, res]);
                        reset();
                        handleOk();
                        setSessionDetail([]);
                    }
                })
                .catch(() =>
                    toast.error(
                        'The newly created date overlaps with the previously created date',
                    ),
                );
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
            alert('Please fill all fields');
            return;
        }

        if (!isTimeSlotValid(currentDetail.from, currentDetail.to)) {
            toast.error(
                'The time slot overlaps with existing sessions or is invalid',
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
                        toast.success('Delete free time detail successfull');
                    }
                })
                .catch(() => toast.error('Delete free time detail failed'));
        }
    };

    return (
        <>
            <div className="flex min-h-[40rem] flex-col gap-[2.4rem] rounded-[0.8rem] bg-[#242526] p-[2rem]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[2.4rem] font-bold text-[#5dd62c]">
                        Freetime sessions
                    </h2>
                    <ButtonCustom onClick={showModal}>Add new</ButtonCustom>
                </div>

                {sessions?.length > 0 &&
                    sessions?.map((item, index) => (
                        <div className="flex flex-col gap-[1.2rem]">
                            <span className="text-[2rem] font-medium">
                                {item?.freeDate && formatDate(item?.freeDate)}
                            </span>
                            <FreeTimeSections
                                sections={item}
                                key={index}
                                onDelete={() => showConfirmModal(item?._id)}
                            />
                        </div>
                    ))}
            </div>
            <ConfirmDeleteModal
                content="Would you like to delete this free time section?"
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
                    <DatePickerComponent
                        name="date"
                        control={control}
                        label="Select a date"
                        isRequired={true}
                        errors={errors.date}
                        rules={{ required: 'Date is required' }}
                    />

                    <div className="flex flex-col gap-[1.6rem]">
                        {sessionDetail.map((detail, index) => (
                            <div
                                key={index}
                                className="flex justify-between gap-[0.8rem] text-white"
                            >
                                <div>{detail.name}</div>
                                <div>
                                    {detail.from} - {detail.to}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Input Fields */}
                    {showInputs && (
                        <div className="flex flex-col gap-[0.8rem]">
                            <InputComponent
                                name="name"
                                label="Name"
                                placeholder="Enter name"
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
                                {/* Select for "To" Time */}
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

                            <button
                                type="button"
                                onClick={handleAddDetail}
                                className="mt-[1rem] flex w-full items-center justify-center gap-[0.8rem] rounded-[0.8rem] border-[0.1rem] border-[#5dd62c] p-[1rem] text-white"
                            >
                                <Image src={icons.plus} alt="icon" />
                                <span className="text-[1.6rem]">
                                    Add to list
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
                            <span className="text-[1.6rem]">Add details</span>
                        </button>
                    )}

                    <ButtonCustom type="submit">Save</ButtonCustom>
                </form>
            </Modal>
        </>
    );
}

export default FreetimeForm;
