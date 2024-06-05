import icons from '@/app/assets/icons';
import Image from 'next/image';

function FooterActionChat() {
    return (
        <div className="flex flex-col gap-[1.2rem]">
            <div className="ml-[0.8rem] flex items-center gap-[1.2rem]">
                <button>
                    <Image
                        src={icons.camera}
                        alt="icon"
                        className="h-[2rem] w-[2rem]"
                    />
                </button>
                <button>
                    <Image
                        src={icons.picture}
                        alt="icon"
                        className="h-[2rem] w-[2rem]"
                    />
                </button>
                <button>
                    <Image
                        src={icons.appAdd}
                        alt="icon"
                        className="h-[2rem] w-[2rem]"
                    />
                </button>
            </div>
            <div className="ml-[1rem] flex items-center gap-[0.8rem] rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem]">
                <input
                    placeholder="texting with mentor..."
                    className="h-full grow bg-transparent text-[1.4rem] focus-within:outline-none"
                />
                <button>
                    <Image src={icons.paperPlane} alt="send message" />
                </button>
            </div>
        </div>
    );
}

export default FooterActionChat;
