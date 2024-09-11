import { Avatar } from 'antd';

function HeaderInfoChat() {
    return (
        <div className="flex h-[7rem] w-full items-center bg-[#2e2d2d] p-[1rem]">
            <Avatar
                src="https://avatars.githubusercontent.com/u/167729556?v=4"
                size={60}
            />
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
