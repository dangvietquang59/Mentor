function ChatUser() {
    return (
        <div className="flex w-full cursor-pointer items-center gap-[2.4rem] rounded-[0.8rem] p-[2rem] duration-300 hover:bg-[#B7EB8F]">
            <picture>
                <img
                    src="https://avatars.githubusercontent.com/u/167729556?v=4"
                    alt="avatar"
                    className="h-[5rem] w-[5rem] rounded-full"
                />
            </picture>
            <div className="">
                <h2 className="text-[2rem] font-bold">Ryomen Sukuna</h2>
                <span className="text-[1.6rem] text-[#96A1AB]">
                    Ăn gì giờ ta?
                </span>
            </div>
        </div>
    );
}

export default ChatUser;
