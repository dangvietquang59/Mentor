import { Modal } from 'antd';
import DatePickerComponent from '../DatePicker';
import SelectComponent from '../Select';
import ButtonCustom from '../ButtonCustom';
import { useEffect, useState } from 'react';
import { generate24Hours } from '@/utils/functions/generate24Hours';
import { useForm, useWatch } from 'react-hook-form';
import { removeLeadingZeros } from '@/utils/functions/slpitTime';
import { formValidation } from '@/utils/constants/formValidation';
import freetimeApi from '@/apis/freetimeApi';
import { toast } from 'sonner';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import { UserType } from '@/types/user';
import { FreeTimeResponseType, FreeTimeType } from '@/types/response/freetime';
import FreetimeTag from '../FreetimeTag';
import { pages } from 'next/dist/build/templates/app-page';

interface SessionProps {
    date: Date;
    from: string;
    to: string;
}

function FreetimeForm() {
    const [arraySession, setArraySession] = useState<FreeTimeType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const accessToken = getAccessTokenClient();
    const time = generate24Hours();
    const profile: UserType = getProfile();
    const params = {
        page: currentPage,
    };
    useEffect(() => {
        const fetchFreetime = async () => {
            if (accessToken && profile?._id) {
                try {
                    const res: FreeTimeResponseType | undefined =
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
        watch,
        formState: { errors },
    } = useForm<SessionProps>();
    const fromValue: string = useWatch({
        control,
        name: 'from',
        defaultValue: '00:00',
    });
    const filterTimeOptions = (timeArray: string[], from: string): string[] => {
        const [fromHour, fromMinute] = from.split(':').map(Number);

        return timeArray.filter((item) => {
            const [itemHour, itemMinute] = item.split(':').map(Number);
            return (
                itemHour > fromHour ||
                (itemHour === fromHour && itemMinute > fromMinute)
            );
        });
    };
    const onSubmit = async (data: SessionProps) => {
        const freeTimeData = {
            freeDate: data?.date,
            startTime: data?.from,
            endTime: data?.to,
        };
        if (accessToken) {
            await freetimeApi
                .create(freeTimeData, accessToken)
                .then((res) => {
                    if (res) {
                        setArraySession((prev) => [...prev, res]);
                        toast.success('Create freetime session successful');
                        handleOk();
                        reset();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            {' '}
            <div className="min-h-[50rem] w-full flex-1 rounded-[0.8rem] bg-[#242526] p-[2rem]">
                <div className="mb-[2.4rem] flex items-center justify-between">
                    <h2 className="text-[2.4rem] font-bold text-[#5DD62C]">
                        Freetime sessions
                    </h2>

                    <ButtonCustom onClick={showModal}>
                        Add new session
                    </ButtonCustom>
                </div>
                {accessToken && (
                    <FreetimeTag
                        sessions={arraySession}
                        token={accessToken}
                        totalPages={totalPages}
                        setPage={setCurrentPage}
                        page={currentPage}
                    />
                )}
            </div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <form
                    className="flex flex-col gap-[2.4rem]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DatePickerComponent
                        name="date"
                        control={control}
                        label="Select Date"
                        isRequired={true}
                        rules={formValidation.date}
                        errors={errors.date}
                    />
                    <div className="grid grid-cols-2 items-center gap-[1.2rem]">
                        <SelectComponent
                            control={control}
                            label="From"
                            name="from"
                            options={time.map((item) => ({
                                label: item,
                                value: removeLeadingZeros(item),
                            }))}
                            defaultValue={'00:00'}
                            isRequired
                            rules={formValidation.from}
                            errors={errors.from}
                        />

                        <SelectComponent
                            control={control}
                            label="To"
                            name="to"
                            options={filterTimeOptions(time, fromValue).map(
                                (item) => ({
                                    label: item,
                                    value: removeLeadingZeros(item),
                                }),
                            )}
                            defaultValue={'00:00'}
                            isRequired
                            rules={formValidation.to}
                            errors={errors.to}
                        />
                    </div>
                    <ButtonCustom>Save</ButtonCustom>
                </form>
            </Modal>
        </>
    );
}

export default FreetimeForm;
