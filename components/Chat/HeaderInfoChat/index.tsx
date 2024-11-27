import icons from '@/assets/icons';
import { UserType } from '@/types/user';
import { Avatar, Image } from 'antd';

interface HeaderInfoChatProps {
    user: UserType;
    setOpen: () => void;
}
function HeaderInfoChat({ user, setOpen }: HeaderInfoChatProps) {
    return (
        <div className="flex h-[7rem] w-full items-center justify-between bg-[#2e2d2d] p-[1rem]">
            <div className="flex items-center gap-[1.2rem]">
                <Avatar src={user?.imageUrl} size={50} />
                <div className="ml-[1rem] flex flex-col gap-[0.2rem]">
                    <h2 className="text-[1.6rem] font-bold">
                        {user?.fullName}
                    </h2>
                    <span className="text-[1.4rem] text-[#6B7B8A]">
                        {user?.bio?.name || 'Mentee'}
                    </span>
                </div>
            </div>
            <button className="size-[2rem]" onClick={setOpen}>
                <Image
                    src={icons.column.src}
                    alt="icon"
                    width={20}
                    preview={false}
                />
            </button>
        </div>
    );
}

export default HeaderInfoChat;
