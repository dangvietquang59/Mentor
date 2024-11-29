'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, message } from 'antd';
import {
    AudioMutedOutlined,
    AudioOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    DesktopOutlined,
    DisconnectOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { Peer } from 'peerjs';
import { io, Socket } from 'socket.io-client';

interface VideoStream {
    stream: MediaStream;
    userId: string;
}

interface VideoParticipant {
    userId: string;
    isCameraOn: boolean;
    isMicOn: boolean;
    isScreenSharing: boolean;
}

export default function VideoChat({
    roomId,
    userId,
}: {
    roomId: string;
    userId: string;
}) {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<VideoStream[]>([]);
    const [participants, setParticipants] = useState<VideoParticipant[]>([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer>();
    const socketRef = useRef<Socket>();
    const screenStreamRef = useRef<MediaStream | null>(null);
    const peersRef = useRef<{ [key: string]: any }>({});

    useEffect(() => {
        let peer: Peer | undefined;
        let retryCount = 0;
        const MAX_RETRIES = 3;
        let isDestroyed = false;

        const initializePeerConnection = async () => {
            try {
                if (isDestroyed) return;

                // Initialize media stream first
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                if (isDestroyed) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                // Initialize Socket.IO with reconnection
                socketRef.current = io(
                    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
                    {
                        withCredentials: true,
                        reconnection: true,
                        reconnectionAttempts: 5,
                        reconnectionDelay: 1000,
                        timeout: 10000,
                    },
                );

                // Initialize PeerJS with retry mechanism and ID generation
                const initPeer = () => {
                    if (isDestroyed) return;

                    // Generate a new ID if we're retrying
                    const peerId =
                        retryCount > 0
                            ? `${userId}-retry-${retryCount}-${Date.now()}`
                            : userId;

                    peer = new Peer(peerId, {
                        host: process.env.NEXT_PUBLIC_PEER_HOST || 'localhost',
                        port: 3001,
                        path: '/peerjs',
                        debug: 2,
                        config: {
                            iceServers: [
                                { urls: 'stun:stun.l.google.com:19302' },
                                { urls: 'stun:global.stun.twilio.com:3478' },
                                {
                                    urls: 'turn:numb.viagenie.ca',
                                    username: 'webrtc@live.com',
                                    credential: 'muazkh',
                                },
                            ],
                        },
                    });

                    peerRef.current = peer;

                    peer.on('open', (id) => {
                        console.log('Connected to PeerJS server with ID:', id);
                        setIsConnecting(false);
                        socketRef.current?.emit('join-room', roomId, id);
                    });

                    peer.on('error', (err) => {
                        console.error('PeerJS error:', err);

                        if (isDestroyed) return;

                        // Handle ID taken error specifically
                        if (err.type === 'unavailable-id') {
                            if (retryCount < MAX_RETRIES) {
                                retryCount++;
                                console.log(
                                    `Retrying with new ID, attempt ${retryCount}`,
                                );
                                peer?.destroy();
                                setTimeout(initPeer, 1000);
                            } else {
                                messageApi.error(
                                    'Failed to connect after multiple attempts',
                                );
                                setIsConnecting(false);
                            }
                        } else {
                            messageApi.error('Connection error. Retrying...');
                            peer?.destroy();
                            setTimeout(initPeer, 5000);
                        }
                    });

                    // Handle incoming calls
                    peer.on('call', async (call) => {
                        try {
                            if (isDestroyed) return;

                            console.log('Receiving call from:', call.peer);
                            call.answer(stream);

                            call.on('stream', (remoteStream) => {
                                if (isDestroyed) return;

                                console.log('Received stream from:', call.peer);
                                setRemoteStreams((prev) => {
                                    if (
                                        prev.find((s) => s.userId === call.peer)
                                    )
                                        return prev;
                                    return [
                                        ...prev,
                                        {
                                            stream: remoteStream,
                                            userId: call.peer,
                                        },
                                    ];
                                });
                            });

                            // Store the call reference
                            peersRef.current[call.peer] = call;
                        } catch (error) {
                            console.error(
                                'Error handling incoming call:',
                                error,
                            );
                            if (!isDestroyed) {
                                messageApi.error(
                                    'Failed to handle incoming call',
                                );
                            }
                        }
                    });
                };

                initPeer();

                // Socket event handlers
                if (socketRef.current) {
                    socketRef.current.on(
                        'existing-participants',
                        (participants: string[]) => {
                            console.log('Existing participants:', participants);
                            participants.forEach((participantId) => {
                                connectToNewUser(participantId, stream);
                            });
                        },
                    );

                    socketRef.current.on(
                        'user-connected',
                        (newUserId: string) => {
                            if (isDestroyed) return;
                            console.log('New user connected:', newUserId);
                            connectToNewUser(newUserId, stream);
                            setParticipants((prev) => [
                                ...prev,
                                {
                                    userId: newUserId,
                                    isCameraOn: true,
                                    isMicOn: true,
                                    isScreenSharing: false,
                                },
                            ]);
                        },
                    );

                    socketRef.current.on(
                        'user-disconnected',
                        (userId: string) => {
                            console.log('User disconnected:', userId);
                            if (peersRef.current[userId]) {
                                peersRef.current[userId].close();
                                delete peersRef.current[userId];
                            }
                            setRemoteStreams((prev) =>
                                prev.filter(
                                    (stream) => stream.userId !== userId,
                                ),
                            );
                            setParticipants((prev) =>
                                prev.filter((p) => p.userId !== userId),
                            );
                        },
                    );

                    socketRef.current.on(
                        'toggle-camera',
                        (userId: string, isEnabled: boolean) => {
                            setParticipants((prev) =>
                                prev.map((p) =>
                                    p.userId === userId
                                        ? { ...p, isCameraOn: isEnabled }
                                        : p,
                                ),
                            );
                        },
                    );

                    socketRef.current.on(
                        'toggle-mic',
                        (userId: string, isEnabled: boolean) => {
                            setParticipants((prev) =>
                                prev.map((p) =>
                                    p.userId === userId
                                        ? { ...p, isMicOn: isEnabled }
                                        : p,
                                ),
                            );
                        },
                    );

                    socketRef.current.on(
                        'screen-share-start',
                        (userId: string) => {
                            setParticipants((prev) =>
                                prev.map((p) =>
                                    p.userId === userId
                                        ? { ...p, isScreenSharing: true }
                                        : p,
                                ),
                            );
                        },
                    );

                    socketRef.current.on(
                        'screen-share-stop',
                        (userId: string) => {
                            setParticipants((prev) =>
                                prev.map((p) =>
                                    p.userId === userId
                                        ? { ...p, isScreenSharing: false }
                                        : p,
                                ),
                            );
                        },
                    );

                    // Handle reconnection events
                    socketRef.current.on('connect', () => {
                        console.log('Socket connected');
                        socketRef.current?.emit('join-room', roomId, userId);
                    });

                    socketRef.current.on('connect_error', (error) => {
                        console.error('Socket connection error:', error);
                        messageApi.error(
                            'Connection error. Attempting to reconnect...',
                        );
                    });
                }

                return stream;
            } catch (error) {
                console.error('Error initializing peer connection:', error);
                if (!isDestroyed) {
                    messageApi.error('Failed to initialize connection');
                    setIsConnecting(false);
                }
            }
        };

        const stream = initializePeerConnection();

        // Cleanup function
        return () => {
            isDestroyed = true;
            stream.then((s) => {
                s?.getTracks().forEach((track) => track.stop());
            });
            screenStreamRef.current
                ?.getTracks()
                .forEach((track) => track.stop());
            Object.values(peersRef.current).forEach((call: any) =>
                call.close(),
            );
            peer?.destroy();
            socketRef.current?.disconnect();
        };
    }, [roomId, userId]);

    const connectToNewUser = (userId: string, stream: MediaStream) => {
        try {
            console.log('Attempting to connect to user:', userId);
            if (!stream || !peerRef.current) {
                console.error('Stream or peer not available');
                return;
            }

            const call = peerRef.current.call(userId, stream);

            // Store the call reference
            peersRef.current[userId] = call;

            call.on('stream', (remoteStream) => {
                console.log('Received stream from user:', userId);
                setRemoteStreams((prev) => {
                    if (prev.find((s) => s.userId === userId)) return prev;
                    return [...prev, { stream: remoteStream, userId }];
                });
            });

            call.on('error', (err) => {
                console.error('Error in call with user:', userId, err);
                messageApi.error(`Connection error with peer. Retrying...`);
                // Retry connection after error
                setTimeout(() => connectToNewUser(userId, stream), 5000);
            });

            call.on('close', () => {
                console.log('Call closed with user:', userId);
                setRemoteStreams((prev) =>
                    prev.filter((stream) => stream.userId !== userId),
                );
            });
        } catch (error) {
            console.error('Error connecting to new user:', error);
            messageApi.error('Failed to connect to peer');
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!audioTrack.enabled);
            socketRef.current?.emit('toggle-mic', !audioTrack.enabled, roomId);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setIsVideoOff(!videoTrack.enabled);
            socketRef.current?.emit(
                'toggle-camera',
                !videoTrack.enabled,
                roomId,
            );
        }
    };

    const toggleScreenShare = async () => {
        try {
            if (!isScreenSharing) {
                const screenStream =
                    await navigator.mediaDevices.getDisplayMedia({
                        video: true,
                    });

                screenStreamRef.current = screenStream;

                // Replace video track
                if (localStream) {
                    const videoTrack = screenStream.getVideoTracks()[0];
                    const sender = localStream.getVideoTracks()[0];
                    sender.stop();
                    localStream.removeTrack(sender);
                    localStream.addTrack(videoTrack);

                    socketRef.current?.emit(
                        'screen-share-start',
                        userId,
                        roomId,
                    );
                }

                setIsScreenSharing(true);

                // Handle screen sharing stop
                screenStream.getVideoTracks()[0].onended = () => {
                    stopScreenSharing();
                };
            } else {
                stopScreenSharing();
            }
        } catch (error) {
            console.error('Error sharing screen:', error);
            messageApi.error('Failed to share screen');
        }
    };

    const stopScreenSharing = async () => {
        try {
            if (screenStreamRef.current) {
                screenStreamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
                screenStreamRef.current = null;
            }

            // Restore camera video
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            const videoTrack = newStream.getVideoTracks()[0];

            if (localStream) {
                const sender = localStream.getVideoTracks()[0];
                sender.stop();
                localStream.removeTrack(sender);
                localStream.addTrack(videoTrack);
            }

            setIsScreenSharing(false);
            socketRef.current?.emit('screen-share-stop', userId, roomId);
        } catch (error) {
            console.error('Error stopping screen share:', error);
            messageApi.error('Failed to stop screen sharing');
        }
    };

    return (
        <div className="flex h-screen flex-col bg-gray-900">
            {contextHolder}

            {isConnecting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="flex items-center gap-2 text-white">
                        <LoadingOutlined className="text-2xl" />
                        <span>Connecting to room...</span>
                    </div>
                </div>
            )}

            {/* Video Grid */}
            <div className="grid flex-1 grid-cols-1 gap-4 p-4 md:grid-cols-2">
                {/* Local Video */}
                <div className="relative w-full overflow-hidden rounded-lg bg-gray-800">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className={`h-full w-full object-cover ${isVideoOff ? 'hidden' : ''}`}
                    />
                    {isVideoOff && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <VideoCameraAddOutlined className="text-4xl text-gray-400" />
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded bg-gray-900 px-2 py-1 text-sm text-white">
                        {userId} {isScreenSharing && '(Screen Sharing)'}
                        {isMuted && (
                            <AudioMutedOutlined className="text-red-500" />
                        )}
                    </div>
                </div>

                {/* Remote Videos */}
                {remoteStreams.map((remoteStream) => {
                    const participant = participants.find(
                        (p) => p.userId === remoteStream.userId,
                    );
                    return (
                        <div
                            key={remoteStream.userId}
                            className="relative overflow-hidden rounded-lg bg-gray-800"
                        >
                            <video
                                autoPlay
                                playsInline
                                className={`h-full w-full object-cover ${!participant?.isCameraOn ? 'hidden' : ''}`}
                                ref={(video) => {
                                    if (video) {
                                        console.log(
                                            'remoteStream.stream',
                                            remoteStream.stream,
                                        );
                                        video.srcObject = remoteStream.stream;
                                    }
                                }}
                            />
                            {!participant?.isCameraOn && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <VideoCameraAddOutlined className="text-4xl text-gray-400" />
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded bg-gray-900 px-2 py-1 text-sm text-white">
                                {participant?.userId}{' '}
                                {participant?.isScreenSharing &&
                                    '(Screen Sharing)'}
                                {!participant?.isMicOn && (
                                    <AudioMutedOutlined className="text-red-500" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="bg-gray-800 p-4">
                <div className="flex justify-center space-x-4">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={
                            isMuted ? <AudioMutedOutlined /> : <AudioOutlined />
                        }
                        onClick={toggleAudio}
                        danger={isMuted}
                        className={`${isMuted ? 'bg-red-500' : 'bg-blue-500'}`}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={
                            isVideoOff ? (
                                <VideoCameraAddOutlined />
                            ) : (
                                <VideoCameraOutlined />
                            )
                        }
                        onClick={toggleVideo}
                        danger={isVideoOff}
                        className={`${isVideoOff ? 'bg-red-500' : 'bg-blue-500'}`}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<DesktopOutlined />}
                        onClick={toggleScreenShare}
                        className={`${isScreenSharing ? 'bg-green-500' : 'bg-blue-500'}`}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<DisconnectOutlined />}
                        danger
                        onClick={() => (window.location.href = '/')}
                    />
                </div>
            </div>
        </div>
    );
}
