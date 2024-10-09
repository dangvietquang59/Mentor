'use client';
import icons from '@/assets/icons';
import images from '@/assets/img';
import { BlogType } from '@/types/response/blog';
import { formatDate } from '@/utils/functions/formatDate';
import { Avatar, Drawer } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import TextAreaComponent from '../TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import ButtonCustom from '../ButtonCustom';

interface ActionBlogProp {
    blog: BlogType;
}
function ActionBlog({ blog }: ActionBlogProp) {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [commnetCount, setCommentCount] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({});
    const onSubmit: SubmitHandler<any> = async (data) => {};
    return (
        <>
            <div className="sticky top-[10%] h-fit w-full rounded-[0.8rem] bg-[#2D2F2E] p-[2rem]">
                <div className="flex items-center gap-[0.8rem]">
                    <Avatar
                        src={blog?.userId?.imageUrl || images.defaultAvatar.src}
                        alt="avatar"
                        size={60}
                    />
                    <div className="flex flex-col gap-[0.2rem]">
                        <h3 className="text-justify text-[1.6rem] font-bold">
                            {blog?.userId?.fullName}
                        </h3>
                        <p className="text-[1.4rem]">
                            {formatDate(blog?.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="mt-[2.4rem] flex items-center gap-[2.4rem] border-t pt-[2.4rem]">
                    <button
                        className="flex items-center gap-[0.8rem]"
                        onClick={() => setLikeCount(likeCount + 1)}
                    >
                        <Image
                            src={likeCount ? icons.likeFill : icons.like}
                            alt="like"
                        />
                        <span className="text-[1.6rem]">{likeCount}</span>
                    </button>
                    <button
                        className="flex items-center gap-[0.8rem]"
                        onClick={showDrawer}
                    >
                        <Image src={icons.comment} alt="like" />
                        <span className="text-[1.6rem]">{commnetCount}</span>
                    </button>
                </div>
            </div>
            <Drawer title="Comments" onClose={onClose} open={open} width={600}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[1.2rem]"
                >
                    <TextAreaComponent
                        isRequired
                        name="short_description"
                        control={control}
                        placeholder="Write something....."
                        // rules={formValidation.short_description}
                        // errors={errors.short_description}
                    />
                    <div className="flex items-end justify-end">
                        <ButtonCustom>Submit</ButtonCustom>
                    </div>
                </form>
            </Drawer>
        </>
    );
}

export default ActionBlog;
