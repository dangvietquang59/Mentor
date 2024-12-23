'use client';
import images from '@/assets/img';
import { Avatar } from 'antd';
import React from 'react';

const SuccessPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-[2.4rem] bg-[#0F0F0F] text-white">
            <Avatar src={images.check.src} alt="icon" size={100} />
            <h1 className="mb-4 text-[2.4rem] font-bold">
                Thanh toán thành công!
            </h1>
            <p className="mb-6 text-[1.4rem]">
                Cảm ơn bạn đã thanh toán. Giao dịch của bạn đã được thực hiện
                thành công.
            </p>
            <button
                className="rounded-md bg-white px-6 py-2 font-semibold text-[#0F0F0F] transition duration-300 hover:bg-gray-300"
                onClick={() => (window.location.href = '/')}
            >
                Về trang chủ
            </button>
        </div>
    );
};

export default SuccessPage;
