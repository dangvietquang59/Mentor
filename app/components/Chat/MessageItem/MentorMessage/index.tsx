function MentorMessage() {
    return (
        <div className="flex gap-[0.8rem]">
            <picture>
                <img
                    src="https://avatars.githubusercontent.com/u/167729556?v=4"
                    alt="avatar"
                    className="h-[3rem] w-[3rem] rounded-full"
                />
            </picture>
            <div className="flex max-w-[45%] flex-col gap-[0.2rem]">
                <p className="break-words rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem] text-[1.4rem]">
                    Nhắn thử 1 cái gì đó ở đây
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
                <span className="text-[#6B7B8A]">20:55</span>
            </div>
        </div>
    );
}

export default MentorMessage;
