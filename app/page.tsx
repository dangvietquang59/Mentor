'use client';
import React from 'react';
import Image from 'next/image';
import images from '@/assets/img';
import SearchCategory from '@/components/SearchCategory';
import OverviewBlog from '@/components/OverviewBlog';
// import NewsFeedItem from '@/components/NewsFeedItem';
import Devider from '@/components/Devider';
import Introduce from '@/components/Introduce';
import ReviewMentee from '@/components/ReviewMentee';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useMounted } from '@/utils/hooks/useMounted';
const Home = () => {
    const mounted = useMounted();

    return (
        <>
            {mounted && (
                <div className="overflow-hidden">
                    <div className="relative">
                        <Image
                            src={images.banner}
                            alt="background"
                            className="h-[65rem] w-full object-cover"
                        />
                        <div className="absolute left-[27%] top-[60%] flex max-w-[60rem] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-[2rem]">
                            <h2 className="text-[5rem] font-bold text-white">
                                Make contact with eminent mentors
                            </h2>
                            <SearchCategory />
                        </div>
                    </div>

                    <div className="mt-[2.4rem] flex flex-col gap-[3.2rem] px-[8%]">
                        <div className="max-w-[100%]">
                            <div className="flex items-center justify-between">
                                <h2 className="my-[1rem] text-[3.6rem] font-bold">
                                    Reccomend for you
                                </h2>
                            </div>
                        </div>
                        <Devider />

                        <div>
                            <OverviewBlog />
                        </div>
                        <div className="mt-[2.4rem]">
                            <p className="text-[3.6rem] font-bold">
                                Recent articles
                            </p>
                            <div className="flex items-center gap-[0.8rem]">
                                <div className="no-scrollbar flex gap-[0.8rem] overflow-x-auto">
                                    <Swiper
                                        modules={[
                                            Navigation,
                                            Pagination,
                                            Scrollbar,
                                            A11y,
                                        ]}
                                        spaceBetween={10}
                                        slidesPerView={3}
                                        navigation
                                        pagination={{ clickable: true }}
                                        scrollbar={{ draggable: true }}
                                    >
                                        {/* {arrayBlog.map((blog) => (
                                            <SwiperSlide>
                                                <NewsFeedItem
                                                    title={blog.title}
                                                    description={
                                                        blog.description
                                                    }
                                                    imageUrl={blog.imageUrl}
                                                />
                                            </SwiperSlide>
                                        ))} */}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Introduce />
                        </div>
                        <Devider />
                        <div className="my-[3rem]">
                            <h2 className="mb-[4rem] text-[3.6rem] font-medium">
                                The mentee's remarks
                            </h2>
                            <div className="grid grid-cols-3 gap-[1rem]">
                                <ReviewMentee />
                                <ReviewMentee />
                                <ReviewMentee />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Home;
