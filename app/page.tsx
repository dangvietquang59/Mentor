'use client';
import React from 'react';
import Image from 'next/image';
import images from '@/assets/img';
import SearchCategory from '@/components/SearchCategory';
import OverviewBlog from '@/components/OverviewBlog';
import NewsFeedItem from '@/components/NewsFeedItem';
import { NewsFeedItemProps } from '@/types/blog';
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

    const arrayBlog: NewsFeedItemProps[] = [
        {
            title: 'The Rise of Artificial Intelligence in Healthcare',
            description:
                'Artificial intelligence (AI) is revolutionizing the healthcare industry by improving diagnosis accuracy, predicting patient outcomes, and streamlining administrative tasks. With advancements in AI technology, we can expect to see even greater improvements in patient care and medical research.',
            imageUrl:
                'https://miro.medium.com/v2/resize:fit:1358/0*9ToWmeRH2_mgrDss',
        },
        {
            title: 'Blockchain Technology: Beyond Cryptocurrency',
            description:
                'While blockchain technology is most commonly associated with cryptocurrencies like Bitcoin, its potential applications extend far beyond finance. From supply chain management to digital voting systems, blockchain has the power to transform various industries by providing secure and transparent solutions for data management and transactions.',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g_TuoXUV2sIhcN758guyV1RfXad7Zhv3Iw&s',
        },
        {
            title: 'The Future of Work: Remote Collaboration Tools',
            description:
                'As remote work becomes increasingly common, the demand for collaboration tools that enable seamless communication and project management is on the rise. From video conferencing platforms to team collaboration software, these tools are shaping the way we work and collaborate in the digital age.',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
        },
        {
            title: '5G Technology: Unlocking the Potential of IoT',
            description:
                'The rollout of 5G technology is set to revolutionize the Internet of Things (IoT) by providing faster, more reliable connectivity. With 5G networks, we can expect to see advancements in smart home devices, autonomous vehicles, and industrial automation, paving the way for a more connected and efficient world.',
            imageUrl:
                'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/12/c-thumb.jpg',
        },
        {
            title: 'The Promise of Quantum Computing',
            description:
                'Quantum computing holds the promise of solving complex problems that are currently beyond the capabilities of classical computers. With its ability to perform calculations at an exponential speed, quantum computing has the potential to revolutionize fields such as cryptography, drug discovery, and optimization.',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NkHVCdQ8j003gxChxXIDHEOivCDDNRE7pg&s',
        },
        {
            title: 'Cybersecurity Trends: Addressing Emerging Threats',
            description:
                'As cyber threats continue to evolve, organizations must stay ahead of the curve by implementing robust cybersecurity measures. From AI-powered threat detection to zero-trust security frameworks, staying informed about emerging trends and technologies is crucial for protecting sensitive data and maintaining digital resilience.',
            imageUrl:
                'https://caodang.fpt.edu.vn/wp-content/uploads/Tailwind-Css.jpg',
        },
        {
            title: 'The Role of Data Analytics in Business Decision-Making',
            description:
                "Data analytics plays a critical role in helping businesses make informed decisions by analyzing large datasets to uncover insights and trends. From customer segmentation to predictive modeling, leveraging data analytics tools and techniques can give organizations a competitive edge in today's data-driven marketplace.",
            imageUrl: 'https://cdn.intuji.com/2022/09/Nestjs_hero1.png',
        },
        {
            title: 'The Evolution of Augmented Reality Technology',
            description:
                'Augmented reality (AR) technology is transforming how we interact with the world around us by overlaying digital content onto the physical environment. From immersive gaming experiences to practical applications in education and healthcare, AR has the potential to reshape various industries and enhance everyday experiences.',
            imageUrl: 'https://cdn.intuji.com/2022/09/Nestjs_hero1.png',
        },
        {
            title: 'The Future of Transportation: Electric and Autonomous Vehicles',
            description:
                'The future of transportation is electric and autonomous, with advancements in battery technology and artificial intelligence driving the shift towards cleaner, safer, and more efficient vehicles. From electric cars to self-driving trucks, these innovations have the potential to revolutionize the way we travel and commute.',
            imageUrl: 'https://cdn.intuji.com/2022/09/Nestjs_hero1.png',
        },
        {
            title: 'Green Technology: Building a Sustainable Future',
            description:
                'Green technology, also known as clean technology, focuses on developing solutions that minimize environmental impact and promote sustainability. From renewable energy sources to eco-friendly materials and recycling innovations, green technology is key to building a more sustainable and resilient future for generations to come.',
            imageUrl: 'https://cdn.intuji.com/2022/09/Nestjs_hero1.png',
        },
    ];

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
                                        {arrayBlog.map((blog) => (
                                            <SwiperSlide>
                                                <NewsFeedItem
                                                    title={blog.title}
                                                    description={
                                                        blog.description
                                                    }
                                                    imageUrl={blog.imageUrl}
                                                />
                                            </SwiperSlide>
                                        ))}
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
