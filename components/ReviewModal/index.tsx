import { Avatar, Modal } from 'antd';
import ButtonCustom from '../ButtonCustom';
import { UserType } from '@/types/user';
import images from '@/assets/img';
import TextAreaComponent from '../TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import reviewApi from '@/apis/reviewApi';
import { getProfile } from '@/utils/functions/getProfile';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { toast } from 'sonner';
import userApi from '@/apis/userApi';
import { useEffect, useState } from 'react';
import { TechnologiesType } from '@/types/response/technologies';
import technologiesApi from '@/apis/technologiesApi';
import SelectComponent from '../Select';
import { formValidation } from '@/utils/constants/formValidation';
import StarRatings from 'react-star-ratings';
interface ReviewModalProps {
    open: boolean;
    mentor: UserType;
    bookingId: string;
    handleOk: () => void;
    handleCancel: () => void;
}

interface FormProps {
    content: string;
    technologies: string[];
}

function ReviewModal({
    open,
    mentor,
    bookingId,
    handleOk,
    handleCancel,
}: ReviewModalProps) {
    const profile: UserType = getProfile();
    const token = getAccessTokenClient();
    const { control, handleSubmit } = useForm<FormProps>();
    const [selectedPoint, setSelectedPoint] = useState<string>('');
    // const points = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const [technologies, setTechnologies] = useState<TechnologiesType[]>([]);
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };
    useEffect(() => {
        const fetchTechnologies = async () => {
            await technologiesApi
                .getAll()
                .then((res) => {
                    if (res) {
                        setTechnologies(res?.technologies);
                    }
                })
                .catch((errors) => console.log(errors));
        };
        fetchTechnologies();
    }, []);
    const onSubmitReply: SubmitHandler<FormProps> = async (data) => {
        const newData = {
            user: profile?._id,
            bookingId,
            content: data?.content,
            technologies: data?.technologies,
            point: rating,
        };
        const dataRating = {
            newRating: rating,
        };
        if (token) {
            await userApi
                .updateRating(dataRating, mentor?._id, token)
                .then((res) => {
                    console.log(res);
                })
                .catch((errors) => console.log(errors));
            await reviewApi
                .create(newData, token)
                .then((res) => {
                    if (res) {
                        toast.success('Review successful');
                        handleOk();
                    }
                })
                .catch(() => toast.error('Review failed'));
        }
    };

    return (
        <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={null}
        >
            <form
                className="flex flex-col gap-[2.4rem] text-white"
                onSubmit={handleSubmit(onSubmitReply)}
            >
                <h2 className="text-center text-[2rem] font-bold">
                    Review your mentor
                </h2>
                <div className="flex items-center gap-[0.8rem]">
                    <Avatar
                        src={mentor?.imageUrl || images.defaultAvatar.src}
                        alt="avatar"
                        size={50}
                    />
                    <div className="flex flex-col">
                        <h3>{mentor?.fullName || 'Mentor'}</h3>
                        <h4>{mentor?.bio?.name || 'Job title'}</h4>
                    </div>
                </div>
                {/* <div className="flex flex-wrap items-center gap-[0.8rem]">
                    {points.map((item, index) => (
                        <button
                            key={index}
                            className={`h-[3rem] w-[5rem] rounded-[0.8rem] border ${selectedPoint === item.toString() ? 'border-[#52BA29] text-[#52BA29]' : 'border-[#ccc]'} `}
                            onClick={() => setSelectedPoint(item.toString())}
                            type="button"
                        >
                            {item}
                        </button>
                    ))}
                </div> */}
                <div className="flex items-center justify-center">
                    <StarRatings
                        rating={rating}
                        starRatedColor="green"
                        changeRating={handleRatingChange}
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <SelectComponent
                    name="technologies"
                    control={control}
                    label="Technologies"
                    options={
                        technologies &&
                        technologies?.map((item) => ({
                            label: item?.name,
                            value: item?._id,
                        }))
                    }
                    mode="multiple"
                    rules={formValidation.technologies}
                />
                <TextAreaComponent
                    isRequired
                    name="content"
                    control={control}
                    placeholder="Write your review..."
                    rules={formValidation.content}
                />
                <div className="grid grid-cols-2 gap-[1.2rem]">
                    <ButtonCustom outline onClick={handleCancel}>
                        Cancel
                    </ButtonCustom>
                    <ButtonCustom onClick={handleOk} type="submit">
                        Submit Review
                    </ButtonCustom>
                </div>
            </form>
        </Modal>
    );
}

export default ReviewModal;
