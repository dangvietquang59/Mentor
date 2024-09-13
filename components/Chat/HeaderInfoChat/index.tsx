import { UserType } from '@/types/user';
import { Avatar } from 'antd';

interface HeaderInfoChatProps {
    user: UserType;
}
function HeaderInfoChat({ user }: HeaderInfoChatProps) {
    return (
        <div className="flex h-[7rem] w-full items-center bg-[#2e2d2d] p-[1rem]">
            <Avatar src={user?.imageUrl} size={60} />
            <div className="ml-[1rem] flex flex-col gap-[0.2rem]">
                <h2 className="text-[1.6rem] font-bold">{user?.fullName}</h2>
                <span className="text-[1.4rem] text-[#6B7B8A]">
                    {user?.bio}
                </span>
            </div>
        </div>
    );
}

export default HeaderInfoChat;
