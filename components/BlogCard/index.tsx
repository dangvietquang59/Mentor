import images from '@/assets/img';
import { BlogType } from '@/types/response/blog';
import paths from '@/utils/constants/paths';
import { formatDate } from '@/utils/functions/formatDate';
import { getFirstImageFromHTML } from '@/utils/functions/getFirstImage';
import { removeImagesFromContent } from '@/utils/functions/removeImageFromHTML';
import { Avatar } from 'antd';
import Link from 'next/link';

interface BlogCardProps {
    blog: BlogType;
}

function BlogCard({ blog }: BlogCardProps) {
    const firstImage = getFirstImageFromHTML(blog.content);
    const processedContent = removeImagesFromContent(blog.content);
    return (
        <div className="h-[40rem] overflow-hidden rounded-[0.8rem] bg-[#2D2F2E]">
            <div className="h-[20rem] w-full">
                <img
                    src={firstImage || images.thumbnailBlog.src}
                    alt="image-thumb"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex h-[20rem] flex-col justify-between">
                <div className="p-[1rem]">
                    <Link href={`${paths.BLOGS}/${paths.VIEW}/${blog?.slug}`}>
                        <h3 className="m-0 line-clamp-1 cursor-pointer text-[2rem] font-bold hover:underline">
                            {blog?.title}
                        </h3>
                    </Link>
                    <div
                        className="mt-[1.4rem] line-clamp-4 text-[1.4rem]"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                </div>
                <div className="p-[0_1rem_1rem_1rem]">
                    <div className="flex items-center gap-[0.4rem]">
                        <Avatar
                            src={
                                blog.userId?.imageUrl ||
                                images.defaultAvatar.src
                            }
                            alt="avatar"
                            size={50}
                        />
                        <div className="flex flex-col gap-[0.2rem]">
                            <span className="text-[1.4rem] font-bold">
                                {blog?.userId?.fullName}
                            </span>
                            <span className="text-[1.4rem]">
                                {formatDate(blog.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
