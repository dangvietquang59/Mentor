import images from '@/app/assets/img';
import Image from 'next/image';

function Introduce() {
    return (
        <div className="grid grid-cols-2 gap-[9rem]">
            <div className="my-[40%] flex flex-col gap-[1.5rem]">
                <div>
                    <h2 className="text-[4.6rem] font-bold">Introduce about</h2>
                    <h2 className="text-[4.6rem] font-bold text-[#5DD62C]">
                        Mentor systems
                    </h2>
                </div>
                <p className="text-justify text-[1.6rem] text-[#9F9F9F]">
                    Greetings from Mentors Systems! We offer a platform that
                    links mentees with IT industry professionals who serve as
                    mentors. Our goal is to accelerate the professional and
                    personal development of mentees by providing them with
                    opportunities to learn from and develop alongside
                    experienced individuals in this promising industry.
                </p>
            </div>
            <Image
                src={images.aboutMentor1}
                alt="image"
                className="w-full object-cover py-[6rem]"
            />
        </div>
    );
}

export default Introduce;
