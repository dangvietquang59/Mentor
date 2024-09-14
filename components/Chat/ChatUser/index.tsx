import { GroupChatResponseType } from '@/types/response/groupChat';
import { UserType } from '@/types/user';
import { useMounted } from '@/utils/hooks/useMounted';
import { Avatar } from 'antd';

interface ChatUserProps {
    selected?: UserType | null;
    groups?: GroupChatResponseType[];
    userId: string;
    selectedIdGroup?: (id: string) => void;
    setSelected?: (user: UserType) => void;
}

function ChatUser({
    selected,
    setSelected,
    groups = [],
    selectedIdGroup,
    userId,
}: ChatUserProps) {
    const mounted = useMounted();

    return (
        <>
            {mounted &&
                groups.length > 0 &&
                groups.map((item, index) => (
                    <div
                        className={`flex w-full cursor-pointer items-center gap-[2.4rem] rounded-[0.8rem] p-[1rem] duration-300 hover:bg-[#0F0F0F] ${selected?._id === item?.members?.[1]?._id || selected?._id === item?.members?.[0]?._id ? 'bg-[#0F0F0F]' : ''}`}
                        key={index}
                        onClick={() => {
                            if (selectedIdGroup) {
                                userId === item?.members?.[1]?._id
                                    ? setSelected?.(item?.members?.[0])
                                    : setSelected?.(item?.members?.[1]);
                                selectedIdGroup(item?._id);
                            }
                        }}
                    >
                        <Avatar
                            src={
                                userId === item?.members?.[1]?._id
                                    ? item?.members?.[0]?.imageUrl
                                    : item?.members?.[1]?.imageUrl
                            }
                            alt="avatar"
                            size={50}
                        />
                        <div>
                            <h2 className="text-[1.6rem] font-bold">
                                {userId === item?.members?.[1]?._id
                                    ? item?.members?.[0]?.fullName
                                    : item?.members?.[1]?.fullName}
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
