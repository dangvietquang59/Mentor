import { GroupChatResponseType } from '@/types/response/groupChat';
import { UserType } from '@/types/user';
import { useMounted } from '@/utils/hooks/useMounted';
import { Avatar } from 'antd';

interface ChatUserProps {
    selected: UserType | null; // Allow null if no user is selected
    setSelected: (user: UserType) => void; // Function to set the selected user
    groups: GroupChatResponseType[];
}

function ChatUser({ selected, setSelected, groups }: ChatUserProps) {
    const mounted = useMounted();

    return (
        <>
            {mounted &&
                groups.length > 0 &&
                groups.map((item, index) => (
                    <div
                        className={`flex w-full cursor-pointer items-center gap-[2.4rem] rounded-[0.8rem] p-[1rem] duration-300 hover:bg-[#0F0F0F] ${selected?._id === item?.members?.[1]?._id ? 'bg-[#0F0F0F]' : ''}`}
                        key={index}
                        onClick={() => setSelected(item?.members?.[1])}
                    >
                        <Avatar
                            src={item?.members?.[1]?.imageUrl}
                            alt="avatar"
                            size={50}
                        />
                        <div>
                            <h2 className="text-[1.6rem] font-bold">
                                {item?.members?.[1]?.fullName}
                            </h2>
                            <span className="text-[1.4rem] text-[#96A1AB]">
                                Chưa có tin nhắn mới
                            </span>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default ChatUser;
