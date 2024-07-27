function HeaderInfoChat() {
    return (
        <div className="flex h-[7rem] w-full items-center border-b-[0.1rem] border-b-[#ccc] p-[1rem]">
            <picture>
                <img
                    src="https://avatars.githubusercontent.com/u/167729556?v=4"
                    alt="avatar"
                    className="h-[5rem] w-[5rem] rounded-full"
                />
            </picture>
            <div className="ml-[1rem] flex flex-col gap-[0.2rem]">
                <h2 className="text-[1.6rem] font-bold">Ryomen Sukuna</h2>
                <span className="text-[1.4rem] text-[#6B7B8A]">
                    Technical Leader
                </span>
            </div>
        </div>
    );
}

export default HeaderInfoChat;
