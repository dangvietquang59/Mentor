'use client';
import { useState } from 'react';
import icons from '../assets/icons';
import MentorItem from '../components/MentorItem';
import Tabs from '../components/Tabs';
import { AttributeMentorItem, MentorItemType } from '../types/mentor';
import { TabType } from '../types/tab';

function Mentors() {
    const attributes: AttributeMentorItem[] = [
        {
            title: 'Technical Program Manager at TDMU',
            icon: icons.briefcase,
        },
        {
            title: '12 sessions (4 reviews)',
            icon: icons.message,
        },
        {
            title: 'experience 9 years',
            icon: icons.code,
        },
    ];
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
    ];
    const [isSelectedTab, setIsSelectedTab] = useState<number>(0);
    const handleSelectedTab = (index: number) => {
        setIsSelectedTab(index);
    };
    return (
        <div>
            <h2 className="mb-[2.4rem] text-[2.6rem] font-bold">
                Find your mentors
            </h2>
            <div className="mb-[2.4rem] flex items-center">
                {optionsTab &&
                    optionsTab.map((item, index) => (
                        <Tabs
                            key={index}
                            title={item.title}
                            isSelected={isSelectedTab === index}
                            onItemClick={() => handleSelectedTab(index)}
                        />
                    ))}
            </div>
            {isSelectedTab === 0 && (
                <div className="grid grid-cols-4 gap-[2.4rem]">
                    {arrayMentor &&
                        arrayMentor.map((item) => (
                            <MentorItem
                                name={item.name}
                                url={item.url}
                                attributes={item.attributes}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

export default Mentors;
