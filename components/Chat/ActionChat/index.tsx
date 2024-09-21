import userApi from '@/apis/userApi';
import icons from '@/assets/icons';
import ButtonCustom from '@/components/ButtonCustom';
import SearchInput from '@/components/SearchInput';
import UserInfo from '@/components/UserInfo';
import { UserType } from '@/types/user';
import { Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    return { isModalOpen, showModal, handleOk, handleCancel };
};

function ActionChat() {
    const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
    const [users, setUsers] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [groupName, setGroupName] = useState<string>('');

    const param = {
        role: '',
        page: currentPage,
    };
    useEffect(() => {
        const fetchUser = async () => {
            await userApi.getAll(param).then((res) => {
                if (res) {
                    setUsers(res?.users);
                    setCurrentPage(Number(res?.currentPage));
                }
            });
        };
        fetchUser();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-[2rem] font-bold">Messages</h2>
                <div className="flex items-end justify-center gap-[0.8rem]">
                    <button onClick={showModal}>
                        <Image
                            src={icons.squarePlus}
                            alt="icon"
                            className="h-[2rem] w-[2rem]"
                        />
                    </button>
                    <button>
                        <Image
                            src={icons.menuDotsVertical}
                            alt="icon"
                            className="h-[2rem] w-[2rem]"
                        />
                    </button>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
                width={500}
            >
                <div className="flex flex-col gap-[2.4rem] text-white">
                    <h2 className="text-center text-[2rem] font-bold">
                        Create new group
                    </h2>
                    <div className="flex items-center gap-[0.8rem]">
                        <div className="flex size-[4rem] cursor-pointer items-center justify-center rounded-full border-[0.2rem]">
                            <Image
                                src={icons.camera}
                                alt="icons"
                                className="size-[2rem]"
                            />
                        </div>
                        <div className="flex-1 rounded-[0.8rem] bg-[#3A3B3C] p-[1rem]">
                            <input
                                placeholder="Enter group name"
                                className="h-full w-full bg-transparent focus-within:outline-none"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>
                    </div>
                    <SearchInput />
                    <div className="flex flex-col gap-[1.2rem]">
                        <h3 className="text-[1.6rem] font-medium">List user</h3>
                        <div className="max-h-[30rem] overflow-y-auto pr-[1rem]">
                            <ul className="mt-[1.2rem] flex flex-col gap-[1.2rem]">
                                {users.length > 0 &&
                                    users.map((item, index) => (
                                        <li key={index}>
                                            <UserInfo
                                                imageUrl={item?.imageUrl}
                                                name={item?.fullName}
                                            />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <ButtonCustom className="w-full">Create</ButtonCustom>
                </div>
            </Modal>
        </>
    );
}

export default ActionChat;
