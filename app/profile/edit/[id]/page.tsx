'use client';
import icons from '@/assets/icons';
import { getProfile } from '@/utils/functions/getProfile';
import { Avatar } from 'antd';
import Image from 'next/image';

function EditProfile() {
    const profile = getProfile() || {};
    console.log(profile);
    return (
        <div className="mx-[10%] mt-[2.4rem] flex gap-[2.4rem]">
            <div className="h-[50rem] w-full flex-1 rounded-[0.8rem] bg-[#242526] p-[2rem]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[2.4rem] font-bold">
                        Your information
                    </h2>
                    <div className="flex cursor-pointer items-center gap-[0.8rem] rounded-[0.8rem] border-[0.2rem] border-white bg-white p-[0.8rem_1rem] text-black">
                        <Image src={icons.editPen} alt="icon" height={20} />
                        <span className="text-[1.6rem]">Edit</span>
                    </div>
                </div>
            </div>
            <div className="relative flex w-[30rem] items-start justify-center">
                <Avatar
                    src={profile?.imageUrl}
                    size={200}
                    className="border-[0.2rem] border-white"
                />
            </div>
        </div>
    );
}

export default EditProfile;
