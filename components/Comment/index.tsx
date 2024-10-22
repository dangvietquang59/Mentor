import { useState } from 'react';
import { CommentType } from '@/types/response/comments';
import { Avatar } from 'antd';
import TextAreaComponent from '../TextArea';
import ButtonCustom from '../ButtonCustom';
import { SubmitHandler, useForm } from 'react-hook-form';
import commentApi from '@/apis/commentApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import images from '@/assets/img';
import { formatTimeString } from '@/utils/functions/formatTimeString';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { toast } from 'sonner';

interface CommentsProps {
    comment: CommentType;
    refeshData: () => void;
}

interface ReplyProps {
    content: string;
}

function Comments({ comment, refeshData }: CommentsProps) {
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const token = getAccessTokenClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState<string>('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        if (token) {
            await commentApi
                .delete(selectedComment, token)
                .then((res) => {
                    if (res) {
                        toast.success('Delete comment successfull');
                        refeshData();
                    }
                })
                .catch(() => toast.error('Delete comment failed'));
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { control, handleSubmit, reset, watch, setValue } =
        useForm<ReplyProps>({});
    const content = watch('content');

    const handleReplyClick = () => {
        setIsReplying(!isReplying);
    };
    const handleEditClick = async (comment: CommentType) => {
        setIsReplying(!isReplying);
        setValue('content', comment.content);
        setIsEdit(true);
        setSelectedComment(comment._id);
    };
    const handleRemoveComment = (id: string) => {
        showModal();
        setSelectedComment(id);
    };
    const onSubmitReply: SubmitHandler<ReplyProps> = async (data) => {
        if (isEdit) {
            const updateData = {
                content: data?.content,
            };
            if (token) {
                await commentApi
                    .update(selectedComment, updateData, token)
                    .then((res) => {
                        if (res) {
                            reset();
                            setIsReplying(false);
                            refeshData();
                            setIsEdit(false);
                        }
                    })
                    .catch((error) => console.log(error));
            }
            return;
        }
        const replyData = {
            content: data.content,
            userId: comment?.userId?._id,
            parent: comment._id,
            postId: comment?.postId,
        };

        if (token) {
            await commentApi
                .create(replyData, token)
                .then((res) => {
                    if (res) {
                        reset();
                        setIsReplying(false);
                        refeshData();
                    }
                })
                .catch((error) => console.log(error));
        } else {
            console.log('Please login to reply');
        }
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <>
            <div className="ml-[2rem]">
                {/* Comment */}
                <div className="flex gap-[0.8rem]">
                    <Avatar
                        src={
                            comment?.userId?.imageUrl ||
                            images.defaultAvatar.src
                        }
                        alt="avatar"
                        size={40}
                    />
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <span className="text-[1.6rem] font-bold">
                                {comment?.userId?.fullName}
                            </span>
                            <span className="text-[1.4rem] text-[#6B7B8A]">
                                {comment?.userId?.bio?.name}
                            </span>
                        </div>
                        <p className="mt-[1.2rem] w-fit rounded-[0.8rem] bg-[#2D2F2E] p-[1rem] text-[1.4rem]">
                            {comment?.content}
                        </p>
                        <div className="flex items-center gap-[1.2rem] p-[1rem]">
                            <span className="text-[1.2rem] text-[#6B7B8A]">
                                {formatTimeString(comment?.createdAt)}
                            </span>
                            <button
                                className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                onClick={handleReplyClick}
                            >
                                Reply
                            </button>
                            <button
                                className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                onClick={() => handleEditClick(comment)}
                            >
                                Edit
                            </button>
                            <button
                                className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                onClick={() =>
                                    handleRemoveComment(comment?._id)
                                }
                            >
                                Remove
                            </button>
                            {comment?.children?.length > 0 && (
                                <button
                                    className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                    onClick={toggleReplies}
                                >
                                    {showReplies
                                        ? 'Hide Replies'
                                        : 'Show Replies'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reply Form */}
                {isReplying && (
                    <form
                        onSubmit={handleSubmit(onSubmitReply)}
                        className="flex w-full flex-col gap-[1.2rem]"
                    >
                        <TextAreaComponent
                            isRequired
                            name="content"
                            control={control}
                            placeholder="Write your reply..."
                        />
                        <div className="flex items-end justify-end gap-[0.8rem]">
                            <ButtonCustom
                                outline
                                type="button"
                                onClick={() => setIsReplying(false)}
                            >
                                Cancel
                            </ButtonCustom>
                            <ButtonCustom disabled={!content} type="submit">
                                {isEdit ? 'Update' : 'Reply'}
                            </ButtonCustom>
                        </div>
                    </form>
                )}

                {/* Show Replies */}
                {showReplies &&
                    comment?.children?.map((reply, index) => (
                        <div key={index} className="ml-[2rem]">
                            <div className="flex gap-[0.8rem]">
                                <Avatar
                                    src={
                                        reply?.userId?.imageUrl ||
                                        images.defaultAvatar.src
                                    }
                                    alt="avatar"
                                    size={40}
                                />
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <span className="text-[1.6rem] font-bold">
                                            {reply?.userId?.fullName}
                                        </span>
                                        <span className="text-[1.4rem] text-[#6B7B8A]">
                                            {reply?.userId?.bio?.name}
                                        </span>
                                    </div>
                                    <p className="mt-[1.2rem] w-fit rounded-[0.8rem] bg-[#2D2F2E] p-[1rem] text-[1.4rem]">
                                        {reply?.content}
                                    </p>
                                    <div className="flex items-center gap-[1.2rem] p-[1rem]">
                                        <span className="text-[1.2rem] text-[#6B7B8A]">
                                            {formatTimeString(reply?.createdAt)}
                                        </span>
                                        <button
                                            className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                            onClick={handleReplyClick}
                                        >
                                            Reply
                                        </button>
                                        <button
                                            className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                            onClick={() =>
                                                handleEditClick(reply)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="cursor-pointer text-[1.2rem] text-[#6B7B8A]"
                                            onClick={() =>
                                                handleRemoveComment(reply?._id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <ConfirmDeleteModal
                isModalOpen={isModalOpen}
                content="Would you like this comment to be deleted?"
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </>
    );
}

export default Comments;
