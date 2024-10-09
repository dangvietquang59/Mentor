'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { BlogType } from '@/types/response/blog';
import blogApi from '@/apis/blogApi';
import BlogCard from '../BlogCard';

function Articles() {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchBlog = async () => {
            await blogApi
                .getAll()
                .then((res) => {
                    if (res) {
                        setBlogs(res?.posts);
                    }
                })
                .catch((error) => console.log(error));
        };
        fetchBlog();
    }, []);
    if (blogs?.length === 0) return null;
    return (
        <>
            <p className="text-[3.6rem] font-bold">Recent articles</p>
            <div className="flex items-center gap-[0.8rem]">
                <div className="no-scrollbar flex gap-[0.8rem] overflow-x-auto">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {blogs?.length > 0 &&
                            blogs?.map((blog, index) => (
                                <SwiperSlide>
                                    <BlogCard blog={blog} key={index} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default Articles;
