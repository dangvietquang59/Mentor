'use client';
import icons from '@/assets/icons';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import MentorMessage from '../Chat/MessageItem/MentorMessage';
import MenteeMessage from '../Chat/MessageItem/MenteeMessage';
import InputComponent from '../Input';

interface SingleChatProps {
    user: { id: string; name: string };
    onClose: () => void;
}

const SingleChat: React.FC<SingleChatProps> = ({ user, onClose }) => {
    const [message, setMessage] = useState<string>('');
    const [arrayMenteeMessage, setArrayMenteeMessage] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            setArrayMenteeMessage((prevMessages) => [...prevMessages, message]);
            setMessage('');
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [arrayMenteeMessage]);

    return createPortal(
        <div className="fixed bottom-4 right-4 flex h-[40rem] w-[40rem] flex-col overflow-hidden rounded-[0.8rem] border bg-white shadow-lg">
            <div className="flex items-center justify-between bg-[#A0D911] p-2">
                <div className="flex items-center gap-[0.8rem]">
                    <picture>
                        <img
                            src="https://www.elleman.vn/wp-content/uploads/2016/07/30/nhin-lai-deadpool-nam-2009-tham-hoa-sieu-anh-hung-elleman-3.jpg"
                            alt="avatar"
                            className="h-[4rem] w-[4rem] rounded-full object-cover"
                        />
                    </picture>
                    <span className="text-[1.6rem] font-medium">
                        {user.name}
                    </span>
                </div>
                <button onClick={onClose}>
                    <Image src={icons.xIcon} alt="icon" />
                </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
                <MentorMessage />
                {arrayMenteeMessage &&
                    arrayMenteeMessage.map((item: string, index: number) => (
                        <MenteeMessage key={index} msg={item} />
                    ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-2">
                <InputComponent name="a" />
            </div>
        </div>,
        document.body,
    );
};

export default SingleChat;
