import { MessageType } from '@/types/message';
import { formatTime } from '@/utils/functions/formatTime';
import { Avatar, Image } from 'antd';

function MessageItem({ msg, time, user, id, attachments }: MessageType) {
    const isLongMessage = msg.length > 100;

    if (user && id !== user?._id) {
        return (
            <div className="flex justify-start gap-[0.8rem]">
                <div className="w-[5rem]">
                    <Avatar src={user?.imageUrl} size={40} />
                </div>
                <div className="flex flex-col gap-[0.8rem]">
                    {attachments.length > 0 && (
                        <div className="flex gap-[0.5rem]">
                            {attachments.map((attachment) => (
                                <Image
                                    key={attachment._id}
                                    src={attachment?.url}
                                    alt={attachment?.filename}
                                    width={100}
                                    height={100}
                                    className="rounded-[0.8rem] object-cover"
                                />
                            ))}
                        </div>
                    )}

                    <div
                        className={`flex ${isLongMessage ? 'max-w-[30%]' : 'w-full'} flex-col gap-[0.8rem] rounded-[0.8rem] bg-[#191818] p-[1rem]`}
                    >
                        <p className="overflow-wrap break-words text-[1.6rem]">
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
                </div>
            </div>
        );
    } else if (user && id === user?._id) {
        return (
            <div className="flex flex-col gap-[0.8rem]">
                {attachments.length > 0 && (
                    <div className="flex justify-end gap-[0.5rem]">
                        {attachments.map((attachment) => (
                            <Image
                                key={attachment._id}
                                src={attachment?.url}
                                alt={attachment?.filename}
                                width={100}
                                height={100}
                                className="rounded-[0.8rem] object-cover"
                            />
                        ))}
                    </div>
                )}
                <div className="flex justify-end">
                    <div
                        className={`flex max-w-[50%] flex-col gap-[0.8rem] rounded-[0.8rem] bg-[#191818] p-[1rem]`}
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
                </div>
            </div>
        );
    }

    return null;
}

export default MessageItem;
