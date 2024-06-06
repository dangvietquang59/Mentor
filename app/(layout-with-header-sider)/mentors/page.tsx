'use client';
import { useState } from 'react';
import Tabs from '../../components/Tabs';
import { TabType } from '../../types/tab';
import SlideImageMentor from '@/app/components/SlideImageMentor';
import { MentorItemType } from '@/app/types/mentor';

function Mentors() {
    const optionsTab: TabType[] = [
        {
            title: 'All',
        },
        {
            title: 'Front-end Developer',
        },
        {
            title: 'Back-end Developer',
        },
        {
            title: 'Fullstack Developer',
        },
        {
            title: 'Dev Ops',
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
    ];

    const [isSelectedTab, setIsSelectedTab] = useState<number>(0);

    return (
        <div className="px-[1rem]">
            <div className="mb-[2.4rem] border-b-[0.1rem] border-b-[#ccc]">
                <Tabs arrayTabs={optionsTab} onSelectTab={setIsSelectedTab} />
            </div>
            {isSelectedTab === 0 && (
                <div className="flex flex-wrap gap-[1.2rem]">
                    {arrayMentor.map((item) => (
                        <SlideImageMentor
                            name={item.name}
                            url={item.url}
                            position={item.position}
                            attributes={item.attributes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Mentors;
