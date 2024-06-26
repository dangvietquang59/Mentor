'use client';
import React from 'react';
import Image from 'next/image';
import images from '@/app/assets/img';
import SearchCategory from '@/app/components/SearchCategory';
import { MentorItemType } from '@/app/types/mentor';
import icons from '@/app/assets/icons';
import useScroll from '@/app/hooks/useScroll';
import SlideImageMentor from '@/app/components/SlideImageMentor';
import OverviewBlog from '@/app/components/OverviewBlog';
import NewsFeedItem from '@/app/components/NewsFeedItem';
import { NewsFeedItemProps } from '@/app/types/blog';

const Dashboard = () => {
    const {
        mentorListContainerRef: mentorScroll,
        handleScroll: handleMentorScroll,
        isAtStart: isMentorStart,
        isAtEnd: isMentorEnd,
    } = useScroll({ scrollAmount: 800 });
    const {
        mentorListContainerRef: listNewsRef,
        handleScroll: handleScrollnewsRef,
        isAtStart: isAtStartNews,
        isAtEnd: isAtEndNews,
    } = useScroll({ scrollAmount: 1000 });
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

            <div className="mt-[2.4rem] flex flex-col gap-[3.2rem] px-[8%]">
                <div className="flex items-center justify-between gap-[0.8rem]">
                    <div className="w-[40%] rounded-[3rem] bg-[#eaff8f] p-[3rem]">
                        <h2 className="text-[9rem] font-bold">
                            Become a{' '}
                            <span className="text-[#A0D911]">mentor</span> now
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-[0.8rem]">
                        <picture>
                            <img
                                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/473865FHw/charlize-theron-53719.jpg"
                                alt="avatar"
                                className="h-[20rem] w-[30rem] rounded-[2rem] object-cover"
                            />
                        </picture>
                        <picture>
                            <img
                                src="https://afamilycdn.com/k:thumb_w/600/FeC7mIEfmQHVffExQxvrGdkRdYCZvO/Image/2016/03/AfamilyPAbrapitthollywood11-05e46/dien-vien-hollywood-2.jpg"
                                alt="avatar"
                                className="h-[20rem] w-[30rem] rounded-[2rem] object-cover"
                            />
                        </picture>
                        <picture>
                            <img
                                src="https://cdn.galaxycine.vn/media/r/y/ryan%20reynolds-ngang.jpg"
                                alt="avatar"
                                className="h-[20rem] w-[30rem] rounded-[2rem] object-cover"
                            />
                        </picture>
                        <picture>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUjYiIXEotmTbp_szOZe7CbCNiyYF_-T9JA&s"
                                alt="avatar"
                                className="h-[20rem] w-[30rem] rounded-[2rem] object-cover"
                            />
                        </picture>
                    </div>
                </div>
                <div className="max-w-[100%]">
                    <div className="flex items-center justify-between">
                        <h2 className="my-[1rem] text-[3rem] font-bold">
                            Finding a suitable mentor
                        </h2>
                        <div className="flex items-center gap-[1.2rem]">
                            <button
                                onClick={() => handleMentorScroll('left')}
                                disabled={isMentorStart}
                            >
                                <Image
                                    src={icons.chevronDown}
                                    alt="icon"
                                    className={`rotate-90 ${isMentorStart && 'opacity-30'}`}
                                />
                            </button>
                            <button
                                onClick={() => handleMentorScroll('right')}
                                disabled={isMentorEnd}
                            >
                                <Image
                                    src={icons.chevronDown}
                                    alt="icon"
                                    className={`rotate-[-90deg] ${isMentorEnd && 'opacity-30'}`}
                                />
                            </button>
                        </div>
                    </div>
                    <div
                        className="no-scrollbar overflow-auto whitespace-nowrap"
                        ref={mentorScroll}
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
                </div>
                <div>
                    <OverviewBlog />
                </div>
                <div className="relative my-[2.4rem]">
                    <div className="flex items-center justify-center">
                        <h2 className="mb-[2.4rem] text-[5rem] font-bold">
                            <span className="text-[#A0D911]">News</span> feed
                            today
                        </h2>
                    </div>
                    <div className="flex items-center gap-[0.8rem]">
                        <button
                            className="rounded-full bg-[rgba(0,0,0,0.1)] p-[1rem] duration-300 hover:bg-[rgba(0,0,0,0.3)]"
                            onClick={() => handleScrollnewsRef('left')}
                            disabled={isAtStartNews}
                        >
                            <Image
                                src={icons.chevronDown}
                                alt="icon"
                                className="w-[7rem] rotate-90"
                            />
                        </button>
                        <div
                            className="no-scrollbar flex gap-[0.8rem] overflow-x-auto"
                            ref={listNewsRef}
                        >
                            {arrayBlog.map((blog) => (
                                <NewsFeedItem
                                    title={blog.title}
                                    description={blog.description}
                                    imageUrl={blog.imageUrl}
                                />
                            ))}
                        </div>
                        <button
                            className="rounded-full bg-[rgba(0,0,0,0.1)] p-[1rem] duration-300 hover:bg-[rgba(0,0,0,0.3)]"
                            onClick={() => handleScrollnewsRef('right')}
                            disabled={isAtEndNews}
                        >
                            <Image
                                src={icons.chevronDown}
                                alt="icon"
                                className="w-[7rem] rotate-[-90deg]"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
