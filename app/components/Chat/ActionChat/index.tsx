import icons from '@/app/assets/icons';
import Image from 'next/image';

function ActionChat() {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-[2rem] font-bold">Messages</h2>
            <div className="flex items-end justify-center gap-[0.8rem]">
                <button>
                    <Image
                        src={icons.squarePlus}
                        alt="icon"
                        className="h-[2rem] w-[2rem]"
                    />
                </button>
                <button>
                    <Image
                        src={icons.menuDotsVertical}
                        alt="icon"
                        className="h-[2rem] w-[2rem]"
                    />
                </button>
            </div>
        </div>
    );
}

export default ActionChat;
