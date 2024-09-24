import icons from '@/assets/icons';
import { Avatar, Image as AntImage } from 'antd';
import Image from 'next/image';

interface BlogItemProps {
    author: string;
    time: string;
    content: string;
}
function BlogItem({ author, time, content }: BlogItemProps) {
    return (
        <div className="min-w-[60rem] rounded-[0.8rem] bg-[#242526] p-[2%]">
            <div className="flex items-center gap-[2.4rem]">
                <div className="flex-1">
                    <div className="mb-[2.4rem] flex items-center gap-[0.8rem]">
                        <Avatar
                            src={
                                'https://avatars.githubusercontent.com/u/167729556?v=4'
                            }
                            size={50}
                        />
                        <div className="grid gap-[0.2rem]">
                            <p className="text-[1.6rem]">{author}</p>
                            <p className="text-[1.4rem]">{time}</p>
                        </div>
                    </div>
                    <p className="text-[1.6rem]">{content}</p>
                </div>
                <div className="h-[12rem] w-[20rem] overflow-hidden rounded-[0.8rem]">
                    <AntImage
                        src={
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAYdfzKFtXqMRghkqwvweGypJO-vBl4eSFQQ&s'
                        }
                        alt="icon"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="mt-[2.4rem] grid grid-cols-[85%_15%]">
                <div className="flex gap-[1.6rem]">
                    <div className="flex items-center gap-[0.4rem]">
                        <Image src={icons.like} alt="icon" width={16} />
                        <p className="text-[1.6rem]">12</p>
                    </div>
                    <div className="flex items-center gap-[0.4rem]">
                        <Image src={icons.comment} alt="icon" width={16} />
                        <p className="text-[1.6rem]">12</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogItem;
