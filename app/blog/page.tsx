'use client';
import Image from 'next/image';
import icons from '../assets/icons';
import ActionButtonBlog from '../components/BlogItem/ActionButtonBlog';
import { useState } from 'react';
import Comments from '../components/Comment';

function Blog() {
    const [comment, setComment] = useState<string>('');
    return (
        <div className="w-[80%] px-[10%] py-[2rem]">
            <div className="flex items-center gap-[0.8rem]">
                <picture>
                    <img
                        src="https://avatars.githubusercontent.com/u/167729556?v=4"
                        alt="avatar"
                        className="h-[4rem] w-[4rem] rounded-full"
                    />
                </picture>
                <div>
                    <p className="text-[1.6rem] font-bold">Ryomen Sukuna</p>
                    <p className="text-[1.4rem] text-[#6B7B8A]">
                        1 tháng trước
                    </p>
                </div>
            </div>
            <p className="my-[2.4rem] text-justify text-[1.4rem] leading-[2.5rem]">
                Sukuna là một đấu sĩ cận chiến cực kỳ điêu luyện và mạnh mẽ. Hắn
                thể hiện sự áp đảo trước Megumi với những đòn vật lý mạnh mẽ.
                Sukuna có thể kết hợp thuật thức và sức mạnh tay đôi của mình,
                khiến hắn trở thành một đối thủ cực kỳ khó bị áp đảo trong trận
                chiến. Sukuna là một đấu sĩ cận chiến cực kỳ điêu luyện và mạnh
                mẽ. Hắn thể hiện sự áp đảo trước Megumi với những đòn vật lý
                mạnh mẽ. Sukuna có thể kết hợp thuật thức và sức mạnh tay đôi
                của mình, khiến hắn trở thành một đối thủ cực kỳ khó bị áp đảo
                trong trận chiến. Sukuna là một đấu sĩ cận chiến cực kỳ điêu
                luyện và mạnh mẽ. Hắn thể hiện sự áp đảo trước Megumi với những
                đòn vật lý mạnh mẽ. Sukuna có thể kết hợp thuật thức và sức mạnh
                tay đôi của mình, khiến hắn trở thành một đối thủ cực kỳ khó bị
                áp đảo trong trận chiến. Sukuna là một đấu sĩ cận chiến cực kỳ
                điêu luyện và mạnh mẽ. Hắn thể hiện sự áp đảo trước Megumi với
                những đòn vật lý mạnh mẽ. Sukuna có thể kết hợp thuật thức và
                sức mạnh tay đôi của mình, khiến hắn trở thành một đối thủ cực
                kỳ khó bị áp đảo trong trận chiến. Sukuna là một đấu sĩ cận
                chiến cực kỳ điêu luyện và mạnh mẽ. Hắn thể hiện sự áp đảo trước
                Megumi với những đòn vật lý mạnh mẽ. Sukuna có thể kết hợp thuật
                thức và sức mạnh tay đôi của mình, khiến hắn trở thành một đối
                thủ cực kỳ khó bị áp đảo trong trận chiến.
            </p>
            <div className="flex items-center gap-[1.2rem]">
                <ActionButtonBlog icon={icons.heart} title="123k" />
                <ActionButtonBlog icon={icons.message} title="Comments" />
                <ActionButtonBlog icon={icons.share} title="Share" />
            </div>

            <h2 className="my-[2.4rem] text-[2rem] font-bold">Comments (12)</h2>
            <div className="flex h-[4rem] w-full items-center rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem]">
                <input
                    placeholder="enter your think"
                    className="h-full grow bg-transparent text-[1.6rem] focus-within:outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                {comment && (
                    <button>
                        <Image src={icons.paperPlane} alt="icon" />
                    </button>
                )}
            </div>
            <div className="mt-[2.4rem] flex flex-col gap-[2.4rem]">
                <Comments />
                <Comments />
                <Comments />
                <Comments />
            </div>
        </div>
    );
}

export default Blog;
