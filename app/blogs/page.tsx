'use client';
import { useEffect, useState } from 'react';
import blogApi from '@/apis/blogApi';
import BlogCard from '@/components/BlogCard';
import paths from '@/utils/constants/paths';
import Link from 'next/link';
import { BlogType, TagType } from '@/types/response/blog';
import SearchInput from '@/components/SearchInput';
import { GoPlus } from 'react-icons/go';
import tagsApi from '@/apis/tagsApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';

const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [tags, setTags] = useState<TagType[]>([]);
    const [query, setQuery] = useState<string>('');
    const token = getAccessTokenClient();

    const fetchTags = async () => {
        if (token) {
            await tagsApi
                .get(token)
                .then((res) => {
                    if (res) {
                        setTags(res?.tags);
                    }
                })
                .catch((error) =>
                    console.error('Failed to fetch blogs:', error),
                );
        }
    };
    const fetchBlogs = async () => {
        await blogApi
            .getAll()
            .then((res) => {
                if (res) {
                    setBlogs(res?.posts);
                }
            })
            .catch((error) => console.error('Failed to fetch blogs:', error));
    };
    useEffect(() => {
        fetchTags();
        fetchBlogs();
    }, []);

    return (
        <div className="mx-[5%] mt-[2%] flex flex-col gap-[2.4rem]">
            <div className="grid grid-cols-[70%_30%] gap-[1.2rem]">
                <div>
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <BlogCard key={index} blog={blog} page="blogs" />
                        ))
                    ) : (
                        <div className="flex w-full items-center justify-center">
                            <p className="text-center text-[2rem] font-bold">
                                Không có bài viết
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex min-h-[50rem] w-full flex-col gap-[2.4rem] rounded-[1rem] bg-[#242526] p-[1rem]">
                    <div className="flex items-center gap-[1rem]">
                        <div className="w-full">
                            {' '}
                            <SearchInput query={query} setQuery={setQuery} />
                        </div>
                        <Link href={`${paths.BLOGS}/${paths.CREATE}`}>
                            <button className="flex h-[4rem] w-[4rem] items-center justify-center rounded-[1rem] border">
                                <GoPlus className="size-[2rem]" />
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-[0.4rem]">
                        {tags?.length > 0 &&
                            tags?.map((item, index) => (
                                <button
                                    key={index}
                                    className="w-fit rounded-[1rem] bg-[#ccc] p-[1rem] text-black"
                                >
                                    {item?.name}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
