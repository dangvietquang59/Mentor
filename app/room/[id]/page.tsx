'use client';
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import ButtonCustom from '@/components/ButtonCustom';

const DetailRoom: React.FC = () => {
    const [peerId, setPeerId] = useState<string>('');
    const [remotePeerId, setRemotePeerId] = useState<string>('');
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const peer = useRef<Peer | null>(null);

    useEffect(() => {
        peer.current = new Peer();

        peer.current.on('open', (id) => {
            setPeerId(id);
            console.log('Your Peer ID:', id);
        });

        peer.current.on('call', (call) => {
            console.log('Incoming call from:', call.peer);
            if (localVideoRef.current?.srcObject) {
                call.answer(localVideoRef.current.srcObject as MediaStream);
            } else {
                console.error('Local video stream not available.');
            }
            call.on('stream', (remoteStream) => {
                console.log('Received remote stream:', remoteStream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                } else {
                    console.error('Remote video element not found.');
                }
            });
        });

        return () => {
            peer.current?.destroy();
        };
    }, []);

    const startCall = () => {
        console.log('Starting call to:', remotePeerId);

        if (remotePeerId && localVideoRef.current?.srcObject) {
            const call = peer.current?.call(
                remotePeerId,
                localVideoRef.current.srcObject as MediaStream,
            );

            call?.on('stream', (remoteStream) => {
                console.log('Received remote stream:', remoteStream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                } else {
                    console.error('Remote video element not found.');
                }
            });

            call?.on('error', (error) => {
                console.error('Error during call:', error);
            });

            call?.on('close', () => {
                console.log('Call ended');
            });
        } else {
            console.error(
                'Remote Peer ID or local video stream is not available',
            );
        }
    };

    const getUserMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
                console.log('Local video stream initialized:', stream);
            } else {
                console.error('Local video element not found.');
            }
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    return (
        <div className="mx-[5%] mt-[2.4rem] rounded-[0.8rem] bg-[#242424] p-[2rem]">
            <h1 className="text-center text-[2.4rem] font-bold">Meeting 1</h1>

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
                    <>
                        <ButtonCustom type="button" onClick={getUserMedia}>
                            Start Video
                        </ButtonCustom>
                        <div className="mt-[2.4rem] flex flex-col gap-[1.2rem]">
                            <h2 className="text-[1.6rem]">Your ID: {peerId}</h2>
                            <div className="flex w-full items-center gap-[2.4rem]">
                                <div className="flex-1 rounded-[0.8rem] bg-black p-[1rem]">
                                    <input
                                        type="text"
                                        placeholder="Enter remote Peer ID"
                                        value={remotePeerId}
                                        onChange={(e) =>
                                            setRemotePeerId(e.target.value)
                                        }
                                        className="h-[3rem] w-full bg-transparent text-[1.6rem] text-white focus-within:outline-none"
                                    />
                                </div>
                                <ButtonCustom
                                    onClick={startCall}
                                    outline
                                    className="w-[10rem]"
                                    type="button"
                                >
                                    Call
                                </ButtonCustom>
                            </div>
                        </div>
                    </>
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
