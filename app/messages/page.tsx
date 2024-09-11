import ChatUser from '../../components/Chat/ChatUser';
import ActionChat from '../../components/Chat/ActionChat';
import SearchInput from '../../components/SearchInput';
import HeaderInfoChat from '../../components/Chat/HeaderInfoChat';
import MentorMessage from '../../components/Chat/MessageItem/MentorMessage';
import MenteeMessage from '../../components/Chat/MessageItem/MenteeMessage';
import FooterActionChat from '../../components/Chat/FooterActionChat';

function Messages() {
    return (
        <div className="mx-[5%] mt-[2%] flex gap-[1.2rem]">
            <div className=" w-[30%] rounded-[0.8rem] bg-[#242526] p-[1rem] pt-[1rem]">
                <ActionChat />
                <SearchInput />
                <div className="flex flex-col gap-[0.8rem]">
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                </div>
            </div>
            <div className="flex w-full flex-col justify-between gap-[1.2rem] overflow-hidden rounded-[0.8rem] bg-[#242526]">
                <div className="flex flex-col gap-[2.4rem]">
                    <HeaderInfoChat />
                    <div className="flex min-h-[20rem] flex-col gap-[1.2rem] p-[1rem]">
                        <MentorMessage />
                        <MentorMessage />
                        <MenteeMessage />
                        <MentorMessage />
                    </div>
                </div>
                <FooterActionChat />
            </div>
        </div>
    );
}

export default Messages;
