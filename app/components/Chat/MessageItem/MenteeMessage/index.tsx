import { MessageType } from '@/app/types/message';

function MenteeMessage({ msg, time }: MessageType) {
    return (
        <div className="flex justify-end">
            <div className="flex max-w-[50%] flex-col gap-[0.2rem]">
                <p className="break-words rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem] text-[1.6rem]">
                    {msg}
                </p>
                <div className="flex justify-end">
                    <span className="text-[#6B7B8A]">{time}</span>
                </div>
            </div>
        </div>
    );
}

export default MenteeMessage;
