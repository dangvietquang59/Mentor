// app/components/VideoCall.tsx
import { SocketContext } from '@/context/SocketContext';
import React, { useState, useRef, useEffect, useContext } from 'react';

const VideoCall: React.FC = () => {
    const context = useContext(SocketContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const {
        name,
        callAccepted,
        myVideo,
        userVideo,
        callEnded,
        stream,
        call,
        answerCall,
        callUser,
        leaveCall,
    } = context;

    const [idToCall, setIdToCall] = useState<string>('');
    const partnerVideo = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        if (partnerVideo.current && callAccepted && userVideo.current) {
            partnerVideo.current.srcObject = userVideo.current.srcObject;
        }
    }, [callAccepted]);

    return (
        <div className="mx-auto flex w-96 flex-col items-center justify-center rounded-lg bg-gray-100 p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Video Call</h2>

            {/* Phần Nhập ID */}
            <div className="mb-4 flex flex-col items-center">
                <input
                    type="text"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                    placeholder="Nhập ID để gọi"
                    className="mb-2 w-4/5 rounded border border-gray-300 p-2"
                />
                <button
                    onClick={() => callUser(idToCall)}
                    className="rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                >
                    Gọi
                </button>
            </div>

            {/* Video của bạn */}
            <div className="mb-4 flex w-full justify-between">
                <div className="flex w-1/2 flex-col items-center">
                    <h3 className="mb-2 text-lg font-semibold">
                        Video của bạn
                    </h3>
                    <video
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        className="w-full rounded-lg border-2 border-gray-300"
                    />
                </div>

                {/* Video của đối tác */}
                {callAccepted && !callEnded && (
                    <div className="flex w-1/2 flex-col items-center">
                        <h3 className="mb-2 text-lg font-semibold">
                            Video đối tác
                        </h3>
                        <video
                            playsInline
                            ref={partnerVideo}
                            autoPlay
                            className="w-full rounded-lg border-2 border-gray-300"
                        />
                    </div>
                )}
            </div>

            {/* Nhận Cuộc Gọi */}
            {call.isReceivingCall && !callAccepted && (
                <div className="mb-4 text-center">
                    <h1 className="text-2xl font-bold">
                        {call.name} đang gọi...
                    </h1>
                    <button
                        onClick={answerCall}
                        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                    >
                        Trả lời
                    </button>
                </div>
            )}

            {/* Kết Thúc Cuộc Gọi */}
            {callAccepted && !callEnded && (
                <button
                    onClick={leaveCall}
                    className="rounded bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
                >
                    Kết thúc cuộc gọi
                </button>
            )}
        </div>
    );
};

export default VideoCall;
