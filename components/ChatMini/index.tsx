'use client';
import { useEffect, useRef, useState } from 'react';
import { Avatar, Spin } from 'antd';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoIosSend } from 'react-icons/io';
import { FaImage } from 'react-icons/fa';
import io from 'socket.io-client';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import groupChatApi from '@/apis/groupChatApi';
import messageApi from '@/apis/messageApi';
import { MessageResponseType } from '@/types/response/messages';
import { UserType } from '@/types/user';
import MessageItem from '@/components/Chat/MessageItem';
import { useScrollToBottom } from '@/utils/hooks/useScrollToBottom';
import { IoCloseSharp } from 'react-icons/io5';
import { useChatStore } from '@/stores/useChatStore';
import { useRoomStore } from '@/stores/useRoomStore';
import { useArrRoomStore } from '@/stores/useArrRoomStore';
import { useUserStore } from '@/stores/useAuthStore';
import { useMounted } from '@/utils/hooks/useMounted';

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

function ChatMini() {
    const token = getAccessTokenClient();
    const profile: UserType = getProfile();
    const { user } = useUserStore();
    const { selectedRoom, setSelectedRoom } = useRoomStore();
    const { rooms, setRooms } = useArrRoomStore();
    const [messages, setMessages] = useState<MessageResponseType[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [isSending, setIsSending] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isLoadingMessage, setIsLoadingMessage] = useState(false);
    const mounted = useMounted();

    const { isOpen, toggleChat } = useChatStore();
    const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() && images.length === 0) return;

        setIsSending(true);
        const formData = new FormData();

        if (selectedRoom && profile) {
            formData.append('senderId', profile._id);
            formData.append('content', newMessage);
            formData.append('groupId', selectedRoom._id);

            images.forEach((image) => {
                formData.append('attachments', image);
            });

            try {
                if (token) {
                    const response = await messageApi.create(formData, token);
                    if (response?.data) {
                        const newMessageData = {
                            ...response.data,
                            sender: profile,
                        };
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            newMessageData,
                        ]);

                        socket.emit('sendMessage', {
                            groupId: selectedRoom._id,
                            message: newMessageData,
                        });

                        setNewMessage('');
                        setImages([]);
                        if (textareaRef.current) {
                            textareaRef.current.style.height = 'auto';
                        }
                    }
                }
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsSending(false);
            }
        }
    };

    const fetchChatGroup = async () => {
        if (token && profile?._id) {
            try {
                const res = await groupChatApi.getById(token, profile._id);
                if (res) {
                    setRooms(res);
                    setSelectedRoom(res?.[0]);
                }
            } catch (error) {
                console.error('Error fetching chat groups:', error);
            }
        }
    };

    useEffect(() => {
        fetchChatGroup();
    }, [token, profile?._id]);

    useEffect(() => {
        if (selectedRoom) {
            socket.emit('joinRoom', selectedRoom._id);
            socket.on('connect', () => {
                socket.emit('joinRoom', selectedRoom._id);
            });

            return () => {
                socket.emit('leaveRoom', selectedRoom._id);
            };
        }
    }, [selectedRoom]);
    const fetchMessages = async () => {
        if (selectedRoom?._id && token) {
            try {
                const res = await messageApi.getByGroup(
                    selectedRoom._id,
                    token,
                );
                if (res) {
                    setMessages(res);
                    setIsLoadingMessage(false);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                setIsLoadingMessage(true);
            }
        }
    };
    useEffect(() => {
        setIsLoadingMessage(true);

        fetchMessages();
    }, [selectedRoom?._id, token]);

    useEffect(() => {
        const handleNewMessage = (message: MessageResponseType) => {
            setMessages((prevMessages) => {
                if (!prevMessages.find((msg) => msg._id === message._id)) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, []);

    // Scroll to the bottom whenever new messages are received or selected room changes
    useEffect(() => {
        useScrollToBottom(messagesEndRef.current);
    }, [messages?.length, isSending]);
    if (user && mounted)
        return (
            <div className="relative">
                <div
                    className="fixed bottom-10 right-10 cursor-pointer rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
                    onClick={toggleChat}
                >
                    <AiOutlineMessage className="h-[3rem] w-[3rem] text-white" />
                </div>

                <div
                    className={`fixed bottom-10 right-[6%] h-[50rem] w-[80rem] transform rounded-lg bg-[#2F2F2F] shadow-2xl transition-all duration-500 ease-in-out ${
                        isOpen ? 'block translate-x-0' : 'hidden translate-x-20'
                    }`}
                >
                    <div className="grid h-full grid-cols-[30%_70%]">
                        <div className="flex h-full flex-col gap-[1.2rem] rounded-l-lg bg-[#232323] p-[1rem] shadow-inner">
                            <h3 className="text-[1.5rem] font-semibold text-white">
                                Tin nhắn
                            </h3>
                            <div className="no-scrollbar flex max-h-[45rem] flex-col gap-[0.6rem] overflow-y-auto">
                                {rooms.map((room, index) => (
                                    <button
                                        key={index}
                                        className={`flex w-full items-center gap-[1rem] rounded-[1rem] p-[1rem] transition-all duration-300 hover:scale-105 ${
                                            room._id === selectedRoom?._id
                                                ? 'bg-[#383838]'
                                                : ''
                                        } hover:bg-[#383838]`}
                                        onClick={() => setSelectedRoom(room)}
                                    >
                                        <Avatar
                                            src={room.members[0]?.imageUrl}
                                            alt="avatar"
                                            size={40}
                                        />
                                        <div className="flex max-w-[13rem] flex-col items-start gap-[0.4rem] truncate">
                                            <h4 className="text-[1.4rem] text-white">
                                                {room.members[0]?.fullName}
                                            </h4>
                                            <span className="text-[#ccc]">
                                                {room.latestMessage?.content ||
                                                    'Chưa có tin nhắn'}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            {selectedRoom ? (
                                <div className="flex h-full flex-col rounded-r-lg bg-[#1D1D1D]">
                                    <div className="flex w-full items-center justify-between gap-[1rem] rounded-tr-lg bg-gradient-to-r from-purple-600 to-indigo-700 p-[1rem]">
                                        <div className="flex items-center gap-[1rem]">
                                            <Avatar
                                                src={
                                                    selectedRoom.members[0]
                                                        ?.imageUrl
                                                }
                                                alt="avatar"
                                                size={40}
                                            />
                                            <div className="flex flex-col items-start gap-[0.4rem]">
                                                <h4 className="text-[1.4rem] text-white">
                                                    {
                                                        selectedRoom.members[0]
                                                            ?.fullName
                                                    }
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-[0.4rem]">
                                            <button
                                                className="p-[1rem]"
                                                onClick={toggleChat}
                                            >
                                                <IoCloseSharp className="h-[2rem] w-[2rem]" />
                                            </button>
                                        </div>
                                    </div>
                                    {isLoadingMessage ? (
                                        <div className="flex h-[50rem] flex-1 items-center justify-center">
                                            <Spin />
                                        </div>
                                    ) : (
                                        <div className="flex-grow overflow-y-auto rounded-b-lg bg-[#1F1F1F] p-[1rem]">
                                            <div
                                                className="flex max-h-[35rem] min-h-[30rem] flex-col gap-[2.4rem] overflow-hidden overflow-y-auto p-[1rem]"
                                                ref={messagesEndRef}
                                            >
                                                {messages.map((item, index) => (
                                                    <MessageItem
                                                        key={index}
                                                        msg={item.content || ''}
                                                        time={
                                                            item.timestamp || ''
                                                        }
                                                        user={item.sender}
                                                        id={profile?._id ?? ''}
                                                        attachments={
                                                            item.attachments ||
                                                            []
                                                        }
                                                    />
                                                ))}
                                                {isSending && (
                                                    <div className="flex justify-end opacity-100">
                                                        <span className="text-[1.4rem] text-[#6B7B8A]">
                                                            Đang gửi...
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="fixed bottom-2 right-[1rem] flex w-[54rem] items-center gap-[1rem] rounded-[1rem] bg-[#333] p-[1rem]">
                                        <button
                                            className="text-[#A8FF96] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[#80E0B4]"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            <FaImage className="h-[2rem] w-[2rem]" />
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                multiple
                                            />
                                        </button>
                                        <div className="flex gap-[1rem]">
                                            {images.map((preview, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(
                                                        preview,
                                                    )}
                                                    alt="Preview"
                                                    className="h-[4rem] w-[4rem] rounded-md object-cover"
                                                />
                                            ))}
                                        </div>
                                        <textarea
                                            ref={textareaRef}
                                            className="h-full grow resize-none overflow-hidden bg-transparent text-[1.4rem] focus:outline-none"
                                            placeholder="Nhắn tin với cố vấn..."
                                            value={newMessage}
                                            onChange={(e) => {
                                                setNewMessage(e.target.value);
                                                autoResizeTextarea(e);
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'Enter' &&
                                                    !e.shiftKey
                                                ) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                        />
                                        <button
                                            className="text-[#A8FF96] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[#80E0B4]"
                                            onClick={handleSendMessage}
                                        >
                                            <IoIosSend className="h-[2rem] w-[2rem]" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-[1.4rem] font-medium text-white">
                                        Chọn phòng để chat
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default ChatMini;
