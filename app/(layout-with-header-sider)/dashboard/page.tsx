'use client';
import BlogItem from '../../components/BlogItem';
import React from 'react';
import SesionToday from '../../components/SesstionToday';
import Image from 'next/image';
import images from '@/app/assets/img';
import SearchCategory from '@/app/components/SearchCategory';
import MentorItem from '@/app/components/MentorItem';
import { AttributeMentorItem, MentorItemType } from '@/app/types/mentor';
import icons from '@/app/assets/icons';
import useScroll from '@/app/hooks/useScroll';

const Dashboard = () => {
    const { mentorListContainerRef, handleScroll, isAtStart, isAtEnd } =
        useScroll({ scrollAmount: 800 });
    const attributes: AttributeMentorItem[] = [
        {
            title: 'Technical Program Manager at TDMUuuuuuuuuuuuuuuuuuuuuu',
            icon: icons.briefcase,
        },
        {
            title: '12 sessions',
            icon: icons.message,
        },
        {
            title: 'experience 9 years',
            icon: icons.code,
        },
    ];
    const arrayMentor: MentorItemType[] = [
        {
            name: 'Gojo Satoru',
            url: 'https://minhtuanmobile.com/uploads/blog/tai-sao-gojo-van-chua-chet-phan-tich-chap-236-jujutsu-kaisen-230922023358.jpg',
            attributes: attributes,
        },
        {
            name: 'Geto Suguru',
            url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/playing-with-the-death-jujutsu-kaisen.jpg',
            attributes: attributes,
        },
        {
            name: 'Okkotsu Yuta',
            url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/yuta-gojo-body-jjk.jpg',
            attributes: attributes,
        },
        {
            name: 'Yuki Tsukumo',
            url: 'https://preview.redd.it/yuki-will-return-as-a-vengeful-spirit-and-yujis-power-up-v0-res6xprzhxma1.jpg?width=785&format=pjpg&auto=webp&s=fd9401b709057654a25debf95f45170b98dd7147',
            attributes: attributes,
        },
        {
            name: 'Okkotsu Yuta',
            url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/yuta-gojo-body-jjk.jpg',
            attributes: attributes,
        },
        {
            name: 'Yuki Tsukumo',
            url: 'https://preview.redd.it/yuki-will-return-as-a-vengeful-spirit-and-yujis-power-up-v0-res6xprzhxma1.jpg?width=785&format=pjpg&auto=webp&s=fd9401b709057654a25debf95f45170b98dd7147',
            attributes: attributes,
        },
        {
            name: 'Okkotsu Yuta',
            url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/yuta-gojo-body-jjk.jpg',
            attributes: attributes,
        },
        {
            name: 'Yuki Tsukumo',
            url: 'https://preview.redd.it/yuki-will-return-as-a-vengeful-spirit-and-yujis-power-up-v0-res6xprzhxma1.jpg?width=785&format=pjpg&auto=webp&s=fd9401b709057654a25debf95f45170b98dd7147',
            attributes: attributes,
        },
        {
            name: 'Yuki Tsukumo',
            url: 'https://preview.redd.it/yuki-will-return-as-a-vengeful-spirit-and-yujis-power-up-v0-res6xprzhxma1.jpg?width=785&format=pjpg&auto=webp&s=fd9401b709057654a25debf95f45170b98dd7147',
            attributes: attributes,
        },
        {
            name: 'Yuki Tsukumo',
            url: 'https://preview.redd.it/yuki-will-return-as-a-vengeful-spirit-and-yujis-power-up-v0-res6xprzhxma1.jpg?width=785&format=pjpg&auto=webp&s=fd9401b709057654a25debf95f45170b98dd7147',
            attributes: attributes,
        },
    ];
    return (
        <div className="overflow-hidden">
            <div className="relative">
                <Image
                    src={images.bgSlider}
                    alt="background"
                    className="h-[60rem] w-full object-cover"
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
                <div className="max-w-[72%]">
                    <h2 className="my-[1rem] text-[2rem] font-bold">
                        Blog from mentor and mentee
                    </h2>
                    <div className="grid grid-cols-2 gap-[1.2rem]">
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </div>
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
                        <div className="flex gap-[0.8rem]">
                            {arrayMentor &&
                                arrayMentor.map((item, index) => (
                                    <MentorItem
                                        key={index}
                                        name={item.name}
                                        url={item.url}
                                        attributes={item.attributes}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="w-[28%]">
                    <SesionToday />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
