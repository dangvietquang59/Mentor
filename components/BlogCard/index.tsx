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
    page?: 'blogs' | 'home';
}

function BlogCard({ blog, page = 'home' }: BlogCardProps) {
    const firstImage = getFirstImageFromHTML(blog.content);
    const processedContent = removeImagesFromContent(blog.content);
    if (page === 'blogs') {
        return (
            <div className="grid grid-cols-[30%_70%] gap-[1.5rem] overflow-hidden rounded-[12px] border border-[#e1e1e1] bg-[#1A1A1A] shadow-md transition-shadow duration-300 hover:shadow-xl">
                <div className="flex items-center justify-center">
                    <div className="h-full w-full">
                        <img
                            src={firstImage || images.thumbnailBlog.src}
                            alt="image-thumb"
                            className="h-full w-full transform rounded-[12px] object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-between rounded-[12px] bg-[#1A1A1A] p-[1.5rem]">
                    <div>
                        <Link
                            href={`${paths.BLOGS}/${paths.VIEW}/${blog?.slug}`}
                        >
                            <h3 className="m-0 cursor-pointer text-[2rem] font-semibold text-white transition-all duration-200 hover:text-[#007bff] hover:underline">
                                {blog?.title}
                            </h3>
                        </Link>
                        <div
                            className="mt-[1.4rem] line-clamp-4 text-[1.4rem] leading-relaxed text-[#ccc]"
                            dangerouslySetInnerHTML={{
                                __html: processedContent,
                            }}
                        />
                    </div>
                    <div className="mt-[1.5rem] flex flex-col gap-[1.5rem]">
                        <div className="flex flex-wrap items-center gap-[1rem]">
                            {blog?.tags?.length > 0 &&
                                blog?.tags?.map((tag, index) => (
                                    <p
                                        key={index}
                                        className="cursor-pointer rounded-[1rem] bg-[#444] p-[0.5rem] text-[1.4rem] text-[#fff] transition-all duration-200 hover:bg-[#007bff] hover:text-white"
                                    >
                                        {tag?.name}
                                    </p>
                                ))}
                        </div>
                        <div className="mt-[1rem] flex items-center gap-[1rem]">
                            <Avatar
                                src={
                                    blog.userId?.imageUrl ||
                                    images.defaultAvatar.src
                                }
                                alt="avatar"
                                size={50}
                                className="border-2 border-[#fff] shadow-md"
                            />
                            <div className="flex flex-col gap-[0.5rem]">
                                <span className="text-[1.4rem] font-bold text-[#fff]">
                                    {blog?.userId?.fullName}
                                </span>
                                <span className="text-[1.4rem] text-[#ccc]">
                                    {formatDate(blog.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (page === 'home')
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
                        <Link
                            href={`${paths.BLOGS}/${paths.VIEW}/${blog?.slug}`}
                        >
                            <h3 className="m-0 line-clamp-1 cursor-pointer text-[2rem] font-bold hover:underline">
                                {blog?.title}
                            </h3>
                        </Link>
                        <div
                            className="mt-[1.4rem] line-clamp-4 text-[1.4rem]"
                            dangerouslySetInnerHTML={{
                                __html: processedContent,
                            }}
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
