'use client';
import { useEffect, useState } from 'react';
import blogApi from '@/apis/blogApi';
import BlogCard from '@/components/BlogCard';
import ButtonCustom from '@/components/ButtonCustom';
import paths from '@/utils/constants/paths';
import Link from 'next/link';
import { BlogType } from '@/types/response/blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            await blogApi
                .getAll()
                .then((res) => {
                    if (res) {
                        setBlogs(res?.posts);
                    }
                })
                .catch((error) =>
                    console.error('Failed to fetch blogs:', error),
                );
        };

        fetchBlogs();
    }, []);

    return (
        <div className="mx-[5%] mt-[2%] flex flex-col gap-[2.4rem]">
            <Link href={`${paths.BLOGS}/${paths.CREATE}`}>
                <ButtonCustom outline>New Blog</ButtonCustom>
            </Link>

            <div className="grid grid-cols-4 gap-[1.2rem]">
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <BlogCard key={index} blog={blog} />
                    ))
                ) : (
                    <div className="flex items-center justify-center">
                        <p className="text-center text-[2rem] font-bold">
                            No blogs available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
