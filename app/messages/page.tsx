import Image from 'next/image';
import icons from '../assets/icons';
import ChatUser from '../components/Chat/ChatUser';

function Messages() {
    return (
        <div className="flex min-h-[100rem] w-full">
            <div className="h-[100rem] w-[25%] rounded border-r border-r-[#ccc] p-[1rem] pt-[1rem]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[2rem] font-bold">Messages</h2>
                    <div className="flex items-end justify-center gap-[0.8rem]">
                        <button>
                            <Image
                                src={icons.squarePlus}
                                alt="icon"
                                className="h-[2.5rem] w-[2.5rem]"
                            />
                        </button>
                        <button>
                            <Image
                                src={icons.menuDotsVertical}
                                alt="icon"
                                className="h-[2.5rem] w-[2.5rem]"
                            />
                        </button>
                    </div>
                </div>
                <div className="my-[2.4rem] flex h-[4rem] items-center rounded-[0.8rem] border border-[#ccc] p-[1rem]">
                    <Image src={icons.search} alt="icon" />
                    <input
                        placeholder="Enter name user"
                        className="h-full grow bg-transparent p-[1rem] text-[1.4rem] focus-within:outline-none"
                    />
                </div>
                <ChatUser />
                <ChatUser />
                <ChatUser />
                <ChatUser />
            </div>
            <div className="mt-[20rem] flex grow flex-col items-center">
                <Image
                    src={icons.chat}
                    alt="icon"
                    className="h-[12rem] w-[12rem]"
                />
                <span className="my-[2.4rem] text-[1.6rem] font-bold text-[#6b7b8a]">
                    Send a new message
                </span>
                <button className="rounded-[0.8rem] bg-[#5B8C00] p-[2rem] text-[1.6rem] font-bold text-white">
                    Send messages
                </button>
            </div>
        </div>
    );
}

export default Messages;
