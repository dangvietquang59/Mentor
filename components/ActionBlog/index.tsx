'use client';
import { useEffect, useState } from 'react';
import { Avatar, Drawer } from 'antd';
import TextAreaComponent from '../TextArea';
import ButtonCustom from '../ButtonCustom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CommentType } from '@/types/response/comments';
import commentApi from '@/apis/commentApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';
import { BlogType } from '@/types/response/blog';
import Comments from '../Comment';
import icons from '@/assets/icons';
import images from '@/assets/img';
import { formatDate } from '@/utils/functions/formatDate';
import { UserType } from '@/types/user';
import { getProfile } from '@/utils/functions/getProfile';
import Image from 'next/image';

interface ActionBlogProp {
    blog: BlogType;
}

interface CommentProps {
    postId: string;
    userId: string;
    content: string;
    parent: string;
}

function ActionBlog({ blog }: ActionBlogProp) {
    const [likeCount, setLikeCount] = useState<number>(0);
    const [commnetCount, setCommentCount] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);

    console.log('comments', comments);
    const profile: UserType = getProfile();
    const router = useRouter();
    const token = getAccessTokenClient();

    const fetchComments = async () => {
        await commentApi
            .getCommentByPost(blog?._id)
            .then((res) => {
                if (res) {
                    setComments(res?.comments);
                    setCommentCount(res?.totalComments);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchComments();
    }, []);

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
        watch,
    } = useForm<CommentProps>({});
    const content = watch('content');

    const onSubmit: SubmitHandler<CommentProps> = async (data) => {
        const commentData = {
            ...data,
            userId: profile?._id,
            postId: blog?._id,
        };

        if (token) {
            await commentApi
                .create(commentData, token)
                .then((res) => {
                    if (res) {
                        reset();
                        fetchComments();
                    }
                })
                .catch((error) => console.log(error));
        } else {
            router.push(paths.SIGNIN);
        }
    };

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
                        <Image src={icons.comment} alt="comment" />
                        <span className="text-[1.6rem]">{commnetCount}</span>
                    </button>
                </div>
            </div>

            <Drawer
                title={`Comments (${commnetCount})`}
                onClose={onClose}
                open={open}
                width={600}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[1.2rem]"
                >
                    <TextAreaComponent
                        isRequired
                        name="content"
                        control={control}
                        placeholder="Write something....."
                    />
                    <div className="flex items-end justify-end">
                        <ButtonCustom disabled={!content} type="submit">
                            Submit
                        </ButtonCustom>
                    </div>
                </form>

                <div className="flex flex-col gap-[1.2rem]">
                    {comments?.length > 0 &&
                        comments?.map((comment, index) => (
                            <Comments
                                key={index}
                                comment={comment}
                                refeshData={fetchComments}
                            />
                        ))}
                </div>
            </Drawer>
        </>
    );
}

export default ActionBlog;
