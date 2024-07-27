'use client';
import Image from 'next/image';
import icons from '../../../assets/icons';
import { useState } from 'react';
import Comments from '../../../components/Comment';

function Blog() {
    const [comment, setComment] = useState<string>('');
    return (
        <div className="w-[80%] px-[2%] py-[2rem]">
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
            <div className="flex items-center gap-[1.2rem]"></div>

            <h2 className="my-[2.4rem] text-[2rem] font-bold">Comments (12)</h2>
            <div className="flex w-[70%] items-center gap-[1.2rem]">
                <picture>
                    <img
                        src="https://avatars.githubusercontent.com/u/167729556?v=4"
                        alt="avatar"
                        className="h-[4rem] w-[4rem] rounded-full"
                    />
                </picture>
                <div className="flex h-[4rem] w-full items-center rounded-[0.8rem] bg-[rgba(0,0,0,0.1)] p-[1rem]">
                    <textarea
                        placeholder="enter your think"
                        className="h-full grow bg-transparent text-[1.6rem] focus-within:outline-none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex w-[70%] justify-end">
                <button
                    className={`mt-[1.2rem] rounded-[0.8rem] bg-[#254000] p-[1rem] text-[1.4rem] font-bold text-white opacity-70 ${comment && 'opacity-100'}`}
                >
                    Post comment
                </button>
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
