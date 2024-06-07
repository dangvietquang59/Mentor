'use client';
import icons from '@/app/assets/icons';
import Input from '@/app/components/Input';
import Image from 'next/image';
import { useState } from 'react';

function Room() {
    const [message, setMessage] = useState<string>('');
    const [arrayMessage, setArrayMessage] = useState<string[]>([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setArrayMessage((prevMessages) => [...prevMessages, message]);
            setMessage('');
        }
    };

    return (
        <div className="flex px-[1rem]">
            <div className="w-[13%] p-[1rem]">
                <p className="text-[2rem] font-bold">List joined</p>
                <ul className="mt-[1.2rem] grid gap-[1.2rem]">
                    <li className="flex items-center gap-[0.8rem]">
                        <picture>
                            <img
                                src="https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008414388.jpg?quality=75&strip=all&w=1024"
                                alt="avatar"
                                className="h-[3rem] w-[3rem] rounded-full object-cover"
                            />
                        </picture>
                        <p className="text-[1.6rem]">John Wick</p>
                    </li>
                </ul>
            </div>
            <div className="flex w-[65%] gap-[2.4rem]">
                <div className="flex w-full flex-col gap-[2.4rem]">
                    <iframe
                        width="100%"
                        height="500"
                        src="https://youtube.com/embed/xB2qsCnqAXA?list=RDxB2qsCnqAXA&start_radio=1"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="flex items-center justify-center gap-[3rem]">
                        <div className="flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.1)] p-[1rem]">
                            <Image
                                src={icons.video}
                                alt="icon"
                                className="h-[4rem] w-[4rem]"
                            />
                        </div>
                        <div className="flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.1)] p-[1rem]">
                            <Image
                                src={icons.mic}
                                alt="icon"
                                className="h-[4rem] w-[4rem]"
                            />
                        </div>
                        <div className="flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.1)] p-[1rem]">
                            <Image
                                src={icons.shareScreen}
                                alt="icon"
                                className="h-[4rem] w-[4rem]"
                            />
                        </div>
                        <div className="flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.1)] p-[1rem]">
                            <Image
                                src={icons.phone}
                                alt="icon"
                                className="h-[4rem] w-[4rem]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-[20%] grow flex-col p-[1rem]">
                <h2 className="mb-[1.2rem] text-[2rem] font-bold">Live chat</h2>
                <div className="mb-[2.4rem] flex h-[50rem] flex-col gap-[1.2rem] overflow-auto">
                    {arrayMessage.map((item, index) => (
                        <p
                            className="w-fit break-words rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem] text-[1.6rem]"
                            key={index}
                        >
                            {item}
                        </p>
                    ))}
                </div>
                <div className="h-[10%]">
                    <Input
                        placeHolder="send message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rightIcon={icons.paperPlane}
                        onEnterOrIconClick={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Room;
