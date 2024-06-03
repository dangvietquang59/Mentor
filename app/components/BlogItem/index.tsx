import icons from '@/app/assets/icons';
import ActionButtonBlog from './ActionButtonBlog';

function BlogItem() {
    return (
        <div className="w-[50rem] cursor-pointer rounded-[0.8rem] border-[0.1rem] border-[#ccc] p-[1rem]">
            <div className="flex items-center gap-[0.8rem]">
                <picture>
                    <img
                        src="https://avatars.githubusercontent.com/u/167729556?v=4"
                        alt="avatar"
                        className="h-[4rem] w-[4rem] rounded-full"
                    />
                </picture>
                <div className="flex flex-col gap-[0.2rem]">
                    <span className="text-[1.4rem] font-bold">
                        Ryomen Sukuna
                    </span>
                    <p className="text-[1.2rem] text-[#6B7B8A]">
                        1 tháng trước
                    </p>
                </div>
            </div>

            <div className="my-[2.4rem]">
                <p className="text-justify text-[1.4rem]">
                    Sukuna là một đấu sĩ cận chiến cực kỳ điêu luyện và mạnh mẽ.
                    Hắn thể hiện sự áp đảo trước Megumi với những đòn vật lý
                    mạnh mẽ. Sukuna có thể kết hợp thuật thức và sức mạnh tay
                    đôi của mình, khiến hắn trở thành một đối thủ cực kỳ khó bị
                    áp đảo trong trận chiến.
                </p>
            </div>

            <div className="flex items-center justify-between">
                <ActionButtonBlog icon={icons.heart} title="123k" />
                <ActionButtonBlog icon={icons.message} title="Comments" />
                <ActionButtonBlog icon={icons.share} title="Share" />
            </div>
        </div>
    );
}

export default BlogItem;
