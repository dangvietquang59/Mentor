'use client';
import BlogItem from '../../components/BlogItem';
import React from 'react';
import Image from 'next/image';
import images from '@/app/assets/img';
import SearchCategory from '@/app/components/SearchCategory';
import { MentorItemType } from '@/app/types/mentor';
import icons from '@/app/assets/icons';
import useScroll from '@/app/hooks/useScroll';
import SlideImageMentor from '@/app/components/SlideImageMentor';

const Dashboard = () => {
    const { mentorListContainerRef, handleScroll, isAtStart, isAtEnd } =
        useScroll({ scrollAmount: 800 });
    const arrayMentor: MentorItemType[] = [
        {
            name: 'Nicolas Cage',
            url: 'https://cand.com.vn/Files/Image/thanhbinh/2019/11/18/ea2d44b5-1bff-4edb-84c7-6a3d253f2803.jpg',
            position: 'Frontend Developer',
            attributes: [
                {
                    title: '9 years',
                },
            ],
        },
        {
            name: 'Bruce Willis',
            url: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/2/13/1013837/The-Rock-1710-1.jpeg?w=526&h=314&crop=auto&scale=both',
            position: 'Backend Developer',
            attributes: [
                {
                    title: '2 years',
                },
            ],
        },
        {
            name: 'Jason Statham',
            url: 'https://ddk.1cdn.vn/2024/01/06/image006.jpg',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'Cristiano Ronaldo',
            url: 'https://nld.mediacdn.vn/2020/10/3/tai-xuong-16017123610432098033804.jpg',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'John Wick',
            url: 'https://vcdn1-giaitri.vnecdn.net/2023/08/31/372264938691962012859421184825-3290-7471-1693478844.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=hdCTVclDOaAOu1rInN283A',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'John Wick',
            url: 'https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008414388.jpg?quality=75&strip=all&w=1024',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'Nicolas Cage',
            url: 'https://cand.com.vn/Files/Image/thanhbinh/2019/11/18/ea2d44b5-1bff-4edb-84c7-6a3d253f2803.jpg',
            position: 'Frontend Developer',
            attributes: [
                {
                    title: '9 years',
                },
            ],
        },
        {
            name: 'Bruce Willis',
            url: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/2/13/1013837/The-Rock-1710-1.jpeg?w=526&h=314&crop=auto&scale=both',
            position: 'Backend Developer',
            attributes: [
                {
                    title: '2 years',
                },
            ],
        },
        {
            name: 'Jason Statham',
            url: 'https://ddk.1cdn.vn/2024/01/06/image006.jpg',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'Cristiano Ronaldo',
            url: 'https://nld.mediacdn.vn/2020/10/3/tai-xuong-16017123610432098033804.jpg',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'John Wick',
            url: 'https://vcdn1-giaitri.vnecdn.net/2023/08/31/372264938691962012859421184825-3290-7471-1693478844.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=hdCTVclDOaAOu1rInN283A',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
        {
            name: 'John Wick',
            url: 'https://pagesix.com/wp-content/uploads/sites/3/2023/03/NYPICHPDPICT000008414388.jpg?quality=75&strip=all&w=1024',
            position: 'Dev ops',
            attributes: [
                {
                    title: '15 years',
                },
            ],
        },
    ];
    return (
        <div className="overflow-hidden">
            <div className="relative">
                <Image
                    src={images.bgSlider}
                    alt="background"
                    className="h-[65rem] w-full object-cover"
                />
                <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transform">
                    <h2 className="text-center text-[5rem] font-bold text-white">
                        Nothing is impossible when you have a mentor
                    </h2>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <SearchCategory />
                </div>
            </div>

            <div className="flex gap-[2.4rem] p-[1rem]">
                <div className="max-w-[100%]">
                    <div className="mt-[2.4rem] flex items-center justify-between">
                        <h2 className="my-[1rem] text-[2rem] font-bold">
                            Finding a suitable mentor
                        </h2>
                        <div className="flex items-center gap-[1.2rem]">
                            <button
                                onClick={() => handleScroll('left')}
                                disabled={isAtStart}
                            >
                                <Image
                                    src={icons.chevronDown}
                                    alt="icon"
                                    className={`rotate-90 ${isAtStart && 'opacity-30'}`}
                                />
                            </button>
                            <button
                                onClick={() => handleScroll('right')}
                                disabled={isAtEnd}
                            >
                                <Image
                                    src={icons.chevronDown}
                                    alt="icon"
                                    className={`rotate-[-90deg] ${isAtEnd && 'opacity-30'}`}
                                />
                            </button>
                        </div>
                    </div>
                    <div
                        className="no-scrollbar overflow-auto whitespace-nowrap"
                        ref={mentorListContainerRef}
                    >
                        <ul className="flex gap-[0.8rem]">
                            {arrayMentor.map((item) => (
                                <li key={item.name}>
                                    <SlideImageMentor
                                        name={item.name}
                                        url={item.url}
                                        position={item.position}
                                        attributes={item.attributes}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h2 className="my-[1rem] mt-[2.4rem] text-[2rem] font-bold">
                        Blog from mentor and mentee
                    </h2>
                    <div className="flex flex-wrap gap-[2.4rem]">
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
