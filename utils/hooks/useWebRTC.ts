import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import io, { Socket } from 'socket.io-client';

interface UseWebRTCProps {
    roomId: string;
    userId: string;
}

interface PeerConnection {
    peerId: string;
    stream: MediaStream;
}

const useWebRTC = ({ roomId, userId }: UseWebRTCProps) => {
    const [peers, setPeers] = useState<PeerConnection[]>([]);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const peerRef = useRef<Peer>();
    const socketRef = useRef<Socket>();

    useEffect(() => {
        const init = async () => {
            socketRef.current = io('http://localhost:3001');
            peerRef.current = new Peer(userId);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setLocalStream(stream);

                peerRef.current.on('call', (call) => {
                    call.answer(stream);
                    call.on('stream', (remoteStream) => {
                        setPeers((prevPeers) => {
                            if (
                                !prevPeers.find((p) => p.peerId === call.peer)
                            ) {
                                return [
                                    ...prevPeers,
                                    { peerId: call.peer, stream: remoteStream },
                                ];
                            }
                            return prevPeers;
                        });
                    });
                });

                socketRef.current.emit('join-room', roomId, userId);

                socketRef.current.on('user-connected', (peerId) => {
                    const call = peerRef.current?.call(peerId, stream);
                    call?.on('stream', (remoteStream) => {
                        setPeers((prevPeers) => {
                            if (!prevPeers.find((p) => p.peerId === peerId)) {
                                return [
                                    ...prevPeers,
                                    { peerId, stream: remoteStream },
                                ];
                            }
                            return prevPeers;
                        });
                    });
                });

                socketRef.current.on('user-disconnected', (peerId) => {
                    setPeers((prevPeers) =>
                        prevPeers.filter((peer) => peer.peerId !== peerId),
                    );
                });
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        init();

        return () => {
            socketRef.current?.disconnect();
            peerRef.current?.destroy();
            localStream?.getTracks().forEach((track) => track.stop());
        };
    }, [roomId, userId]);

    return { peers, localStream };
};

export default useWebRTC;
