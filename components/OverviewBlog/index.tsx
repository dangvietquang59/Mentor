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
                        Trở thành cố vấn tại
                    </p>
                    <span className="text-[4.7rem] font-bold text-[#5DD62C]">
                        Mentor systems
                    </span>
                    <span className="ml-[0.2rem] text-[4.7rem] font-bold">
                        !
                    </span>
                    <p className="text-justify text-[1.6rem] text-[#9F9F9F]">
                        Tham gia Hệ thống Mentor với tư cách là người cố vấn.
                        Đây là cơ hội để bạn cố vấn cho những người học trẻ tuổi
                        và truyền đạt những kinh nghiệm sâu sắc của mình. Chúng
                        tôi khuyến khích bạn tạo ra một mạng lưới cố vấn sôi
                        động và giúp đỡ lẫn nhau thăng tiến về mặt chuyên môn.
                        Cùng nhau, chúng ta hãy phát triển sự nghiệp và đảm bảo
                        sự thịnh vượng cho các thế hệ mai sau!
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-[1.6rem]">
                    <ButtonCustom className="text-white">
                        Tham gia với tư cách cố vấn !
                    </ButtonCustom>
                    <ButtonCustom outline>Về chúng tôi</ButtonCustom>
                </div>
            </div>
        </div>
    );
}

export default OverviewBlog;
