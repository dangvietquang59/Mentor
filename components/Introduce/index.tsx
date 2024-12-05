import images from '@/assets/img';
import Image from 'next/image';

function Introduce() {
    return (
        <div className="grid grid-cols-2 gap-[9rem]">
            <div className="my-[40%] flex flex-col gap-[1.5rem]">
                <div>
                    <h2 className="text-[4.6rem] font-bold">Giới thiệu về</h2>
                    <h2 className="text-[4.6rem] font-bold text-[#5DD62C]">
                        Mentor systems
                    </h2>
                </div>
                <p className="text-justify text-[1.6rem] text-[#9F9F9F]">
                    Lời chào từ Hệ thống cố vấn! Chúng tôi cung cấp một nền tảng
                    liên kết những người được cố vấn với các chuyên gia trong
                    ngành CNTT đóng vai trò là người cố vấn. Mục tiêu của chúng
                    tôi là thúc đẩy sự phát triển nghề nghiệp và cá nhân của
                    những người được cố vấn bằng cách cung cấp cho họ cơ hội học
                    hỏi và phát triển cùng với những cá nhân có kinh nghiệm
                    trong ngành đầy hứa hẹn này.
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
