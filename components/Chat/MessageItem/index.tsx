import { MessageType } from '@/types/message';
import { formatTime } from '@/utils/functions/formatTime';
import { Avatar } from 'antd';

function MessageItem({ msg, time, user, id }: MessageType) {
    if (user && id !== user?._id && msg && time) {
        return (
            <div className="flex gap-[0.8rem]">
                <Avatar src={user?.imageUrl} size={40} />
                <div className="flex max-w-[45%] flex-col gap-[0.2rem]">
                    <p className="break-words rounded-[0.8rem] bg-[#191818] p-[1rem] text-[1.4rem]">
                        {msg}
                    </p>
                    <span className="text-[#6B7B8A]">{formatTime(time)}</span>
                </div>
            </div>
        );
    } else if (user && id === user?._id && msg && time) {
        return (
            <div className="flex justify-end">
                <div className="flex max-w-[50%] flex-col gap-[0.2rem]">
                    <p className="break-words rounded-[0.8rem] bg-[#191818] p-[1rem] text-[1.6rem]">
                        {msg}
                    </p>
                    {time && (
                        <div className="flex justify-end">
                            <span className="text-[#6B7B8A]">
                                {formatTime(time)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MessageItem;
