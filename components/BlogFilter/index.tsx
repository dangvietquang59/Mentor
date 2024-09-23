'use client';
import icons from '@/assets/icons';
import Image from 'next/image';
import BlogTag from '../BlogTag';
import ButtonCustom from '../ButtonCustom';
import { useState } from 'react';
import { Modal } from 'antd';
import BlogForm from '../BlogForm';

function BlogFilter() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="sticky top-[13%] max-h-[50rem] rounded-[0.8rem] bg-[#242526] p-[2rem]">
                {/* search */}
                <div className="flex items-center gap-[0.8rem]">
                    <div className="flex w-full items-center gap-[0.8rem] rounded-[0.8rem] bg-[#3A3B3C] p-[1rem]">
                        <Image src={icons.searchGrey} alt="icon" />
                        <input
                            placeholder="search"
                            className="h-full w-full bg-transparent text-[1.6rem] focus-within:outline-none"
                        />
                    </div>
                    <ButtonCustom onClick={showModal}>New</ButtonCustom>
                </div>
                {/* tag  */}

                <div className="mt-[2.4rem]">
                    <h2 className="text-[2rem] font-bold">Blog tag</h2>
                    <div className="mt-[2.4rem] flex flex-wrap gap-[0.8rem]">
                        <BlogTag />
                        <BlogTag />
                        <BlogTag />
                        <BlogTag />
                    </div>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                closable={false}
                footer={null}
                centered
                style={{ maxHeight: '80vh', overflow: 'auto' }}
                className="min-h-[50rem]"
            >
                <BlogForm />
            </Modal>
        </>
    );
}

export default BlogFilter;
