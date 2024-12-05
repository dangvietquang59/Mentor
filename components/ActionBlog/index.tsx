'use client';
import { useEffect, useState } from 'react';
import { Avatar, Drawer, Popover } from 'antd';
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
import blogApi from '@/apis/blogApi';
import { toast } from 'sonner';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
    const handleDeletePost = async () => {
        if (token) {
            await blogApi
                .delete(blog?._id, token)
                .then((res) => {
                    if (res) {
                        toast.success('Xóa bài viết thành công');
                        setIsModalOpen(false);
                        router.push(paths.BLOGS);
                    }
                })
                .catch(() => toast.error('Xóa bài viết thất bại'));
        }
    };
    const contentAction = (
        <div className="flex flex-col gap-[1.2rem]">
            <button
                className="w-[10rem] text-[1.4rem] font-medium text-white duration-300 hover:opacity-70"
                onClick={() =>
                    router.push(`${paths.BLOGS}/${paths.EDIT}/${blog?.slug}`)
                }
            >
                Edit
            </button>
            <button
                className="w-[10rem] text-[1.4rem] font-medium text-white duration-300 hover:opacity-70"
                onClick={showModal}
            >
                Delete
            </button>
        </div>
    );
    return (
        <>
            <div className="sticky top-[10%] h-fit w-full rounded-[0.8rem] bg-[#2D2F2E] p-[2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[0.8rem]">
                        <Avatar
                            src={
                                blog?.userId?.imageUrl ||
                                images.defaultAvatar.src
                            }
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
                    {profile?._id === blog?.userId?._id && (
                        <Popover content={contentAction} placement="bottom">
                            <button>
                                <Image src={icons.moreHorizontal} alt="icon" />
                            </button>
                        </Popover>
                    )}
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
            <ConfirmDeleteModal
                isModalOpen={isModalOpen}
                content="Would you like to delete this blog ?"
                handleOk={handleDeletePost}
                handleCancel={handleCancel}
            />
        </>
    );
}

export default ActionBlog;
