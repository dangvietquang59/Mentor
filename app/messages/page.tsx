import ChatUser from '../../components/Chat/ChatUser';
import ActionChat from '../../components/Chat/ActionChat';
import SearchInput from '../../components/SearchInput';
import HeaderInfoChat from '../../components/Chat/HeaderInfoChat';
import MentorMessage from '../../components/Chat/MessageItem/MentorMessage';
import MenteeMessage from '../../components/Chat/MessageItem/MenteeMessage';
import FooterActionChat from '../../components/Chat/FooterActionChat';

function Messages() {
    return (
        <div className="flex w-full">
            <div className="h-[65rem] w-[30%] rounded border-r border-r-[#ccc] p-[1rem] pt-[1rem]">
                <ActionChat />
                <SearchInput />
                <div className="flex flex-col gap-[0.8rem]">
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                    <ChatUser />
                </div>
            </div>
            <div className="w-full">
                <HeaderInfoChat />
                <div className="flex min-h-[48rem] flex-col gap-[1.2rem] p-[1rem]">
                    <MentorMessage />
                    <MentorMessage />
                    <MenteeMessage />
                    <MentorMessage />
                </div>
                <FooterActionChat />
            </div>
        </div>
    );
}

export default Messages;
