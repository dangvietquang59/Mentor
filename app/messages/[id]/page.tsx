'use client';

import ChatUser from '../../../components/Chat/ChatUser';
import ActionChat from '../../../components/Chat/ActionChat';
import SearchInput from '../../../components/SearchInput';
import HeaderInfoChat from '../../../components/Chat/HeaderInfoChat';
import { useEffect, useRef, useState } from 'react';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { GroupChatResponseType } from '@/types/response/groupChat';
import { useGetIdFromUrl } from '@/utils/functions/getIdUrl';
import { UserType } from '@/types/user';
import groupChatApi from '@/apis/groupChatApi';
import messageApi from '@/apis/messageApi';
import { MessageResponseType } from '@/types/response/messages';
import io from 'socket.io-client';
import Image from 'next/image';
import icons from '@/assets/icons';
import MessageItem from '../../../components/Chat/MessageItem';
import { getProfile } from '@/utils/functions/getProfile';
import { useScrollToBottom } from '@/utils/hooks/useScrollToBottom';

// Initialize socket outside of component
const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

function Messages() {
    const [groups, setGroups] = useState<GroupChatResponseType[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<UserType | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<string>('');
    const [messages, setMessages] = useState<MessageResponseType[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [isSending, setIsSending] = useState(false);
    const accessToken = getAccessTokenClient();
    const id = useGetIdFromUrl();
    const profile: UserType = getProfile();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            setImages((prevImages) => [...prevImages, ...fileArray]);
        }
    };

    useEffect(() => {
        useScrollToBottom(messagesEndRef.current);
    }, [messages?.length, isSending]);

    useEffect(() => {
        if (selectedGroupId) {
            console.log(`Emitting joinRoom for group: ${selectedGroupId}`);
            socket.emit('joinRoom', selectedGroupId);
        }

        socket.on('connect', () => {
            console.log('Connected to socket server');
            if (selectedGroupId) {
                console.log(
                    `Emitting joinRoom after reconnect for group: ${selectedGroupId}`,
                );
                socket.emit('joinRoom', selectedGroupId);
            }
        });

        return () => {
            if (selectedGroupId) {
                console.log(`Leaving room: ${selectedGroupId}`);
                socket.emit('leaveRoom', selectedGroupId);
            }
        };
    }, [selectedGroupId]);

    useEffect(() => {
        const handleNewMessage = (message: MessageResponseType) => {
            console.log('Received newMessage event from server:', message);

            setMessages((prevMessages) => {
                // Nếu tin nhắn không trùng ID thì thêm vào
                if (
                    message &&
                    !prevMessages.find((msg) => msg._id === message._id)
                ) {
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
    useEffect(() => {
        const fetchChatGroup = async () => {
            if (accessToken && id) {
                try {
                    const res = await groupChatApi.getById(accessToken, id);
                    if (res) {
                        setGroups(res);
                    }
                } catch (error) {
                    console.error('Error fetching chat groups:', error);
                }
            }
        };
        fetchChatGroup();
        useScrollToBottom(messagesEndRef.current);
    }, [accessToken, id]);

    useEffect(() => {
        if (selectedGroupId && accessToken) {
            const fetchMessages = async () => {
                try {
                    const res = await messageApi.getByGroup(
                        selectedGroupId,
                        accessToken,
                    );
                    if (res) {
                        const validMessages = res.filter(
                            (msg) => msg && msg.content,
                        );
                        setMessages(validMessages);
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
        }
    }, [selectedGroupId]);

    useEffect(() => {
        if (groups.length > 0) {
            const defaultSelected =
                groups[0]?.members.find((member) => member._id !== id) || null;
            setSelectedGroupId(groups[0]._id);
            setSelectedGroup(defaultSelected);
        }
    }, [groups, id]);

    const handleSendMessage = async () => {
        const formData = new FormData();

        if (profile) {
            formData.append('senderId', profile?._id);
            formData.append('content', newMessage);
            formData.append('groupId', selectedGroupId);

            images.forEach((image, index) => {
                formData.append('attachments', image);
            });
        }

        // Check if there is a message to send
        if (!newMessage.trim() && images.length === 0) return;

        setIsSending(true);
        try {
            if (accessToken) {
                const result = await messageApi.create(formData, accessToken);
                if (result) {
                    const newData = {
                        ...result?.data,
                        sender: profile,
                    };
                    setMessages((prevMessages) => [...prevMessages, newData]);

                    // Emit socket event for new message

                    socket.emit('sendMessage', {
                        groupId: selectedGroupId,
                        message: newData,
                    });

                    // Reset message input and images
                    setNewMessage('');
                    setImages([]);
                } else {
                    console.error('Failed to send message');
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleSetMessage = (value: string) => {
        setNewMessage(value);
    };

    const handleGroupSelect = (groupId: string) => {
        setSelectedGroupId(groupId);
    };
    const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
    return (
        <div className="mx-[5%] mt-[2%] flex max-h-[85vh] min-h-[85vh] gap-[1.2rem]">
            <div className="w-[30%] rounded-[0.8rem] bg-[#242526] p-[1rem] pt-[1rem]">
                <ActionChat />
                <SearchInput className="my-[2.4rem]" />
                <div className="flex flex-col gap-[0.8rem]">
                    {id && (
                        <ChatUser
                            selected={selectedGroup}
                            setSelected={setSelectedGroup}
                            groups={groups}
                            selectedIdGroup={handleGroupSelect}
                            userId={id}
                        />
                    )}
                </div>
            </div>
            <div className="flex w-full flex-col justify-between gap-[1.2rem] overflow-hidden rounded-[0.8rem] bg-[#242526]">
                {selectedGroup && <HeaderInfoChat user={selectedGroup} />}
                <div
                    className="no-scrollbar flex max-h-[50vh] min-h-[30rem] flex-col gap-[2.4rem] overflow-y-auto p-[1rem]"
                    ref={messagesEndRef}
                >
                    {messages.map((item, index) => (
                        <MessageItem
                            key={index}
                            msg={item?.content || ''}
                            time={item?.timestamp || ''}
                            user={item?.sender}
                            id={id ?? ''}
                            attachments={item.attachments || []}
                        />
                    ))}
                    {isSending && (
                        <div className="flex justify-end">
                            <span className="text-[1.4rem] text-[#6B7B8A]">
                                Đang gửi...
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex h-auto flex-col gap-[1.2rem] bg-[#2E2D2D] p-[1rem]">
                    <div className="flex items-center gap-[1.2rem]">
                        {/* Add buttons */}
                        <>
                            <button onClick={handleIconClick} type="button">
                                <Image
                                    src={icons.photo}
                                    alt="upload image"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"
                                />
                            </button>

                            {/* Input file ẩn */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                            />
                        </>
                    </div>

                    <div className="flex flex-col gap-[0.4rem]">
                        {/* Hiển thị ảnh đã chọn */}
                        {images.length > 0 && (
                            <div className="mt-2 flex gap-2">
                                {images.map((image, index) => (
                                    <div key={index} className="relative">
                                        {/* Hiển thị ảnh */}
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Selected image ${index + 1}`}
                                            className="h-[8rem] w-[8rem] rounded object-cover"
                                        />
                                        {/* Button xóa ảnh */}
                                        <button
                                            onClick={() => {
                                                setImages((prevImages) =>
                                                    prevImages.filter(
                                                        (_, i) => i !== index,
                                                    ),
                                                );
                                            }}
                                            className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#5dd62c] text-sm text-white"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-[0.8rem] rounded-[0.8rem] bg-[#3A3B3C] p-[1rem]">
                            <textarea
                                placeholder="texting with mentor..."
                                className="h-full grow resize-none overflow-hidden bg-transparent text-[1.4rem] focus:outline-none"
                                value={newMessage}
                                rows={1}
                                onChange={(e) => {
                                    handleSetMessage(e.target.value);
                                    autoResizeTextarea(e);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <button onClick={handleSendMessage}>
                                <Image
                                    src={icons.paperPlane}
                                    alt="send message"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
