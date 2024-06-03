import icons from '@/app/assets/icons';
import Image from 'next/image';

function SendNewMessage() {
    return (
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
    );
}

export default SendNewMessage;
