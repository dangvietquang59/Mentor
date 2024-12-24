'use client';
import images from '@/assets/img';
import { Avatar } from 'antd';
import React from 'react';

const FailedPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-[2.4rem] bg-[#0F0F0F] text-white">
            <div className="mb-6">
                {/* Hình ảnh minh họa */}
                <Avatar src={images.fail.src} alt="icon" size={100} />
            </div>
            <h1 className="mb-4 text-center text-[2.4rem] font-bold">
                Thanh toán thất bại!
            </h1>
            <p className="mb-6 text-[1.4rem]">
                Rất tiếc, giao dịch của bạn không thể thực hiện. Vui lòng thử
                lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.
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

export default FailedPage;
