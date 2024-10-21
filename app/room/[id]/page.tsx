'use client';
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import ButtonCustom from '@/components/ButtonCustom';

const socket = io('http://localhost:3001');

interface PeersType {
    [key: string]: any;
}

const DetailRoom: React.FC = () => {
    const [peerId, setPeerId] = useState<string>('');
    const [peers, setPeers] = useState<PeersType>({});
    const [roomId] = useState<string>('room-1');
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const peer = useRef<Peer | null>(null);

    useEffect(() => {
        peer.current = new Peer();

        peer.current.on('open', (id) => {
            setPeerId(id);
            console.log('Your Peer ID:', id);
            socket.emit('join-room', roomId, id);
        });

        peer.current.on('call', (call) => {
            console.log('Incoming call from:', call.peer);
            if (localVideoRef.current?.srcObject) {
                call.answer(localVideoRef.current.srcObject as MediaStream);
            }
            call.on('stream', (remoteStream) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                }
            });
        });

        return () => {
            peer.current?.destroy();
        };
    }, []);

    useEffect(() => {
        socket.on('user-connected', (userId: string) => {
            console.log(`User connected: ${userId}`);
            callUser(userId); // Tự động gọi người dùng mới kết nối
        });

        socket.on('user-disconnected', (userId: string) => {
            if (peers[userId]) {
                peers[userId].close();
                setPeers((prevPeers: PeersType) => {
                    const updatedPeers = { ...prevPeers };
                    delete updatedPeers[userId];
                    return updatedPeers;
                });
            }
            console.log(`User disconnected: ${userId}`);
        });

        socket.on('toggle-camera', (userId: string, isEnabled: boolean) => {
            console.log(`User ${userId} toggled camera: ${isEnabled}`);
            // Cập nhật UI hoặc thông báo cho người dùng
        });

        socket.on('toggle-mic', (userId: string, isEnabled: boolean) => {
            console.log(`User ${userId} toggled mic: ${isEnabled}`);
            // Cập nhật UI hoặc thông báo cho người dùng
        });

        return () => {
            socket.off('user-connected');
            socket.off('user-disconnected');
            socket.off('toggle-camera');
            socket.off('toggle-mic');
        };
    }, [peers]);

    const callUser = (userId: string) => {
        const localStream = localVideoRef.current
            ?.srcObject as MediaStream | null;

        if (!localStream) {
            console.error('Local stream is not available');
            return;
        }

        const call = peer.current?.call(userId, localStream);
        call?.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
            }
        });

        call?.on('close', () => {
            console.log(`Call with ${userId} ended`);
        });

        setPeers((prevPeers: PeersType) => ({ ...prevPeers, [userId]: call }));
    };

    const getUserMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
                socket.emit('join-room', roomId, peerId);
            }
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    const toggleCamera = () => {
        const videoTrack = (
            localVideoRef.current?.srcObject as MediaStream
        )?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            socket.emit('toggle-camera', peerId, videoTrack.enabled); // Gửi thông báo đến người dùng khác
        }
    };

    const toggleMic = () => {
        const audioTrack = (
            localVideoRef.current?.srcObject as MediaStream
        )?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            socket.emit('toggle-mic', peerId, audioTrack.enabled); // Gửi thông báo đến người dùng khác
        }
    };

    const shareScreen = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = screenStream;
            }
            // Gọi đến tất cả người dùng với luồng màn hình
            for (const userId in peers) {
                callUser(userId);
            }
        } catch (error) {
            console.error('Error sharing screen:', error);
        }
    };

    return (
        <div className="mx-[5%] mt-[2.4rem] rounded-[0.8rem] bg-[#242424] p-[2rem]">
            <h1 className="text-center text-[2.4rem] font-bold">
                Meeting Room
            </h1>
            <div className="grid grid-cols-2 gap-[2.4rem]">
                <div className="flex flex-col gap-[0.8rem]">
                    <h3 className="text-center text-[1.6rem] font-medium">
                        My camera
                    </h3>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className="h-[30rem] w-full rounded-[0.8rem] bg-black"
                    />
                    <ButtonCustom type="button" onClick={getUserMedia}>
                        Start Video
                    </ButtonCustom>
                    <ButtonCustom type="button" onClick={toggleCamera}>
                        Toggle Camera
                    </ButtonCustom>
                    <ButtonCustom type="button" onClick={toggleMic}>
                        Toggle Mic
                    </ButtonCustom>
                    <ButtonCustom type="button" onClick={shareScreen}>
                        Share Screen
                    </ButtonCustom>
                </div>
                <div className="flex flex-col gap-[0.8rem]">
                    <h3 className="text-center text-[1.6rem] font-medium">
                        Remote camera
                    </h3>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        muted
                        className="h-[30rem] w-full rounded-[0.8rem] bg-black"
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailRoom;
