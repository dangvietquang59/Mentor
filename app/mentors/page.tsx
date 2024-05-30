import icons from '../assets/icons';
import MentorItem from '../components/MentorItem';
import { AttributeMentorItem } from '../types/mentor';

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
    return (
        <div>
            <h2 className="mb-[2.4rem] text-[2.6rem] font-bold">
                Find your mentors
            </h2>
            <div className="grid grid-cols-4 gap-[2.4rem]">
                <MentorItem
                    name="Gojo Satoru"
                    url="https://minhtuanmobile.com/uploads/blog/tai-sao-gojo-van-chua-chet-phan-tich-chap-236-jujutsu-kaisen-230922023358.jpg"
                    attributes={attributes}
                />
                <MentorItem
                    name="Geto Suguru"
                    url="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/playing-with-the-death-jujutsu-kaisen.jpg"
                    attributes={attributes}
                />
                <MentorItem
                    name="Okkotsu Yuta"
                    url="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/yuta-gojo-body-jjk.jpg"
                    attributes={attributes}
                />
                <MentorItem
                    name="Yuki Tsukumo"
                    url="https://preview.redd.it/yuki-will-return-as-a-vengeful-spirit-and-yujis-power-up-v0-res6xprzhxma1.jpg?width=785&format=pjpg&auto=webp&s=fd9401b709057654a25debf95f45170b98dd7147"
                    attributes={attributes}
                />
                <MentorItem
                    name="Gojo Satoru"
                    url="https://gamek.mediacdn.vn/133514250583805952/2024/1/10/photo-1704875560315-17048755604101726629738-1704876556773-1704876557168200423170-1704877873911-17048778744241586136832.png"
                    attributes={attributes}
                />
            </div>
        </div>
    );
}

export default Mentors;
