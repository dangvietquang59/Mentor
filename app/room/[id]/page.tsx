'use client';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import bookingApi from '@/apis/bookingApi';
import icons from '@/assets/icons';
import ButtonStreamAction from '@/components/ButtonSteamAction';
import { BookingGetResponeType } from '@/types/response/booking';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useGetIdFromUrl } from '@/utils/functions/getIdUrl';

const socket = io('http://localhost:3001'); // Kết nối đến signaling server

function SteamingRoom() {
    const [room, setRoom] = useState<BookingGetResponeType | null>(null);
    const roomId = useGetIdFromUrl();
    const token = getAccessTokenClient();

    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);

    const localStream = useRef<MediaStream | null>(null);
    const screenStream = useRef<MediaStream | null>(null);
    const remoteStream = useRef<MediaStream | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);

    // Function to initialize WebRTC connection and media streams
    const initWebRTC = async () => {
        try {
            // Initialize PeerConnection
            peerConnection.current = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('ice-candidate', {
                        candidate: event.candidate,
                        target: roomId,
                    });
                }
            };

            peerConnection.current.ontrack = (event) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };

            // Get local media stream from camera and microphone
            localStream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: micOn,
            });

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream.current;
            }

            localStream.current.getTracks().forEach((track) => {
                peerConnection.current?.addTrack(track, localStream.current!);
            });

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            socket.emit('offer', { offer, target: roomId });
        } catch (error) {
            console.error('Error accessing media devices', error);
        }
    };

    // Handle screen sharing functionality
    const handleScreenSharing = async () => {
        if (!screenSharing) {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                });
                const screenTrack = stream.getTracks()[0];

                // Replace camera video with screen share
                screenStream.current = stream;
                localStream.current
                    ?.getTracks()
                    .forEach((track) => track.stop());

                // Display shared screen
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = screenStream.current;
                }

                // Add screen track to peer connection
                peerConnection.current?.addTrack(
                    screenTrack,
                    screenStream.current!,
                );
                setScreenSharing(true);
            } catch (error) {
                console.error('Error sharing screen', error);
            }
        } else {
            // Stop screen sharing
            screenStream.current?.getTracks().forEach((track) => track.stop());
            setScreenSharing(false);

            // Reinitialize camera stream if camera is on
            if (cameraOn) {
                initWebRTC();
            }
        }
    };

    // Fetch room data and handle WebRTC signaling
    useEffect(() => {
        if (token && roomId) {
            const fetchRoom = async () => {
                await bookingApi
                    .getById(roomId, token)
                    .then((res) => {
                        if (res) setRoom(res);
                    })
                    .catch((error) => console.log(error));
            };
            fetchRoom();
        }

        // Handle WebRTC signaling through socket
        socket.on('offer', async (data) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(
                    new RTCSessionDescription(data.offer),
                );
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                socket.emit('answer', { answer, target: data.sender });
            }
        });

        socket.on('answer', async (data) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(
                    new RTCSessionDescription(data.answer),
                );
            }
        });

        socket.on('ice-candidate', async (data) => {
            if (peerConnection.current && data.candidate) {
                await peerConnection.current.addIceCandidate(
                    new RTCIceCandidate(data.candidate),
                );
            }
        });

        return () => {
            socket.disconnect();
            localStream.current?.getTracks().forEach((track) => track.stop());
            screenStream.current?.getTracks().forEach((track) => track.stop());
        };
    }, [roomId, token]);

    return (
        <div className="mx-[5%] my-[2%] flex gap-[2.4rem]">
            <div className="flex w-[80%] flex-col items-center justify-center gap-[2.4rem]">
                <div className="grid max-w-[70%] grid-cols-4 items-center justify-center gap-[1.2rem]">
                    <ButtonStreamAction
                        icon={cameraOn ? icons.video : icons.videoOff}
                        name={cameraOn ? 'Camera on' : 'Camera off'}
                        isActive={cameraOn}
                        onClick={() => {
                            setCameraOn(!cameraOn);
                            if (cameraOn) {
                                localStream.current
                                    ?.getTracks()
                                    .forEach((track) => track.stop());
                            } else {
                                initWebRTC();
                            }
                        }}
                    />
                    <ButtonStreamAction
                        icon={micOn ? icons.mic : icons.micOff}
                        name={micOn ? 'Mic on' : 'Mic off'}
                        isActive={micOn}
                        onClick={() => setMicOn(!micOn)}
                    />
                    <ButtonStreamAction
                        icon={icons.share}
                        name={screenSharing ? 'Stop Share' : 'Share Screen'}
                        isActive={screenSharing}
                        onClick={handleScreenSharing}
                    />
                    <ButtonStreamAction
                        icon={icons.phoneOff}
                        name="Ngắt kết nối"
                        isActive={true}
                        onClick={() => {
                            peerConnection.current?.close();
                            setCameraOn(false);
                            setMicOn(false);
                            setScreenSharing(false);
                        }}
                    />
                </div>
            </div>
            <div className="flex w-[20%] flex-col gap-[1.6rem]">
                {room && (
                    <>
                        <div className="relative flex min-h-[24rem] w-full items-center justify-center overflow-hidden rounded-[0.8rem] bg-[#1A1A1A]">
                            <video
                                ref={localVideoRef}
                                autoPlay
                                muted
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <div className="relative flex min-h-[24rem] w-full items-center justify-center overflow-hidden rounded-[0.8rem] bg-[#1A1A1A]">
                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SteamingRoom;
