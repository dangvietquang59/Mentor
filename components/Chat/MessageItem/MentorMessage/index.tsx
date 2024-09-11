import { Avatar } from 'antd';

function MentorMessage() {
    return (
        <div className="flex gap-[0.8rem]">
            <Avatar
                src="https://avatars.githubusercontent.com/u/167729556?v=4"
                size={40}
            />
            <div className="flex max-w-[45%] flex-col gap-[0.2rem]">
                <p className="break-words rounded-[0.8rem] bg-[#191818] p-[1rem] text-[1.4rem]">
                    Nhắn thử 1 cái gì đó ở đây
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
                <span className="text-[#6B7B8A]">20:55</span>
            </div>
        </div>
    );
}

export default MentorMessage;
