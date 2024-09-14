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
    const accessToken = getAccessTokenClient();
    const id = useGetIdFromUrl();
    const [selectedGroup, setSelectedGroup] = useState<UserType | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<string>('');
    const [messages, setMessages] = useState<MessageResponseType[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const profile: UserType = getProfile();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        useScrollToBottom(messagesEndRef.current);
    }, [messages]);

    useEffect(() => {
        if (selectedGroupId) {
            socket.emit('joinRoom', selectedGroupId);
        }
        return () => {
            if (selectedGroupId) {
                socket.emit('leaveRoom', selectedGroupId);
            }
        };
    }, [selectedGroupId]);

    useEffect(() => {
        socket.on('newMessage', (message: MessageResponseType) => {
            setMessages((prevMessages) => {
                if (
                    message &&
                    !prevMessages.find((msg) => msg?._id === message?._id)
                ) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
        });

        return () => {
            socket.off('newMessage');
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
                        // Filter out invalid messages
                        const validMessages = res.filter(
                            (msg) => msg && msg.content,
                        );
                        console.log('validMessages', validMessages);
                        setMessages(validMessages);
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
        }
    }, [selectedGroupId, accessToken]);

    useEffect(() => {
        if (groups.length > 0) {
            const defaultSelected =
                groups[0]?.members.find((member) => member._id !== id) || null;
            setSelectedGroupId(groups[0]._id);
            setSelectedGroup(defaultSelected);
        }
    }, [groups, id]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            if (id && accessToken) {
                const timestamp = new Date().toISOString();
                const data = {
                    groupId: selectedGroupId,
                    content: newMessage,
                    senderId: id,
                    timestamp,
                };

                const res = await messageApi.create(data, accessToken);
                if (res) {
                    const formatNewMessage = {
                        ...res?.data,
                        sender: profile,
                    };
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        formatNewMessage,
                    ]);
                    setNewMessage('');
                    socket.emit('sendMessage', data);
                }
            } else {
                console.error('Missing id or accessToken');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSetMessage = (value: string) => {
        setNewMessage(value);
    };

    const handleGroupSelect = (groupId: string) => {
        setSelectedGroupId(groupId);
    };
    return (
        <div className="mx-[5%] mt-[2%] flex max-h-[85vh] min-h-[85vh] gap-[1.2rem]">
            <div className="w-[30%] rounded-[0.8rem] bg-[#242526] p-[1rem] pt-[1rem]">
                <ActionChat />
                <SearchInput />
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
                    className="no-scrollbar flex max-h-[60vh] min-h-[20rem] flex-col gap-[1.2rem] overflow-y-auto p-[1rem]"
                    ref={messagesEndRef}
                >
                    {messages.map((item, index) => (
                        <MessageItem
                            key={index}
                            msg={item.content}
                            time={item.timestamp}
                            user={item.sender}
                            id={id ?? ''}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-[1.2rem] bg-[#2E2D2D] p-[1rem]">
                    <div className="flex items-center gap-[1.2rem]">
                        {/* Add buttons */}
                    </div>
                    <div className="flex items-center gap-[0.8rem] rounded-[0.8rem] bg-[#3A3B3C] p-[1rem]">
                        <input
                            placeholder="texting with mentor..."
                            className="h-full grow bg-transparent text-[1.4rem] focus:outline-none"
                            value={newMessage}
                            onChange={(e) => handleSetMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <button onClick={handleSendMessage}>
                            <Image src={icons.paperPlane} alt="send message" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
