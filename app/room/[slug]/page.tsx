'use client';
import icons from '@/assets/icons';
import InputComponent from '@/components/Input';
import Image from 'next/image';

function RoomDetails() {
    return (
        <div className="mx-[5%] mt-[2.4rem]">
            <div className="grid min-h-[50rem] grid-cols-[70%_30%] gap-[1.6rem]">
                <div className="h-full w-full">
                    <picture>
                        <img
                            src="https://www.animaker.com/static_2.0/img/videomaker/video-maker-og-image.webp"
                            className="h-full rounded-[0.4rem]"
                        />
                    </picture>
                </div>
                <div className="flex flex-col justify-between rounded-[0.4rem] bg-[#242526]">
                    <div></div>
                    <div className="flex items-center rounded-[0.4rem] bg-[#f0f0f0]">
                        <InputComponent name="email" />
                        <button>
                            <Image src={icons.paperPlane} alt="send message" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetails;
