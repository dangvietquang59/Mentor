import images from '@/assets/img';
import Image from 'next/image';
import ButtonCustom from '../ButtonCustom';
function OverviewBlog() {
    return (
        <div className="grid grid-cols-2 gap-[10rem] py-[6rem]">
            <div className="grid grid-cols-2 gap-[2rem]">
                <Image src={images.aboutMentor1} alt="mentor1" />
                <Image src={images.aboutMentor2} alt="mentor1" />
                <Image src={images.aboutMentor1} alt="mentor1" />
                <Image src={images.aboutMentor2} alt="mentor1" />
            </div>
            <div className="my-[25%] flex flex-col gap-[2.4rem]">
                <div>
                    <p className="text-[4.7rem] font-bold">
                        Become a mentor in
                    </p>
                    <span className="text-[4.7rem] font-bold text-[#5DD62C]">
                        Mentor systems
                    </span>
                    <span className="ml-[0.2rem] text-[4.7rem] font-bold">
                        !
                    </span>
                    <p className="text-justify text-[1.6rem] text-[#9F9F9F]">
                        Join Mentor Systems as a mentor. This is your chance to
                        mentor young learners and impart your insightful
                        experiences. We urge you to create a vibrant network of
                        mentors and to help one another advance professionally.
                        Together, let's progress our careers and ensure the
                        prosperity of upcoming generations!
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-[1.6rem]">
                    <ButtonCustom>Join as a mentor !</ButtonCustom>
                    <ButtonCustom outline>About us</ButtonCustom>
                </div>
            </div>
        </div>
    );
}

export default OverviewBlog;
