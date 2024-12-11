import icons from '@/assets/icons';
import { MessageType } from '@/types/message';
import { formatTime } from '@/utils/functions/formatTime';
import { Avatar, Image } from 'antd';
import NextImage from 'next/image';

function MessageItem({ msg, time, user, id, attachments }: MessageType) {
    const isLongMessage = msg.length > 50;

    if (user && id !== user?._id) {
        return (
            <div className="flex justify-start gap-[0.8rem]">
                {/* <div className="w-[5rem]">
                    <Avatar src={user?.imageUrl} size={40} />
                </div> */}
                <div className="flex flex-col gap-[0.8rem]">
                    {attachments.length > 0 && (
                        <div className="flex items-center justify-center gap-[0.5rem]">
                            <div
                                className="grid gap-[0.8rem]"
                                style={{
                                    gridTemplateColumns: `repeat(${Math.min(attachments.length, 2)}, 1fr)`,
                                }}
                            >
                                {attachments.map((attachment) => (
                                    <Image
                                        key={attachment._id}
                                        src={attachment?.url}
                                        alt={attachment?.filename}
                                        width={200}
                                        height={200}
                                        className="h-full w-full rounded-[0.8rem] object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {msg === '' && (
                        <span className="text-[#6B7B8A]">
                            {formatTime(time)}
                        </span>
                    )}
                    {msg !== '' && (
                        <div className="group flex items-center gap-[0.8rem]">
                            <div
                                className={`flex ${isLongMessage ? 'max-w-[50rem]' : 'w-full'} flex-col gap-[0.8rem] rounded-[0.8rem] bg-[#191818] p-[1rem]`}
                            >
                                <p className="overflow-wrap max-w-full break-words text-[1.6rem]">
                                    {msg}
                                </p>
                                {time && (
                                    <div className="flex">
                                        <span className="text-[#6B7B8A]">
                                            {formatTime(time)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button className="min-w-[2rem] max-w-[2rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <NextImage
                                    src={icons.trash}
                                    alt="icon"
                                    className="h-full w-full"
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } else if (user && id === user?._id) {
        return (
            <div className="flex flex-col gap-[0.8rem]">
                {attachments.length > 0 && (
                    <div className="flex justify-end gap-[0.5rem]">
                        <div
                            className={`grid items-end justify-end gap-[0.8rem]`}
                            style={{
                                gridTemplateColumns: `repeat(${Math.min(attachments.length, 2)}, 1fr)`,
                            }}
                        >
                            {attachments.map((attachment) => (
                                <Image
                                    key={attachment._id}
                                    src={attachment?.url}
                                    alt={attachment?.filename}
                                    width={200}
                                    height={200}
                                    className="h-full w-full rounded-[0.8rem] object-cover"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="group flex justify-end gap-[0.8rem]">
                    <button className="min-w-[2rem] max-w-[2rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <NextImage
                            src={icons.trash}
                            alt="icon"
                            className="h-full w-full"
                        />
                    </button>
                    {msg === '' && (
                        <span className="text-[#6B7B8A]">
                            {formatTime(time)}
                        </span>
                    )}
                    {msg !== '' && (
                        <div
                            className={`flex max-w-[50%] flex-col gap-[0.8rem] rounded-[0.8rem] bg-[#454545] p-[1rem]`}
                        >
                            <p className="overflow-wrap break-words text-[1.6rem]">
                                {msg}
                            </p>
                            {time && (
                                <div className="flex items-end justify-end">
                                    <span className="text-[#6B7B8A]">
                                        {formatTime(time)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}

export default MessageItem;
