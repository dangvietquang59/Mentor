import { Avatar } from 'antd';

function ReviewMentee() {
    return (
        <div className="rounded-[0.8rem] bg-[#2d2f2e] px-[1.5rem] py-[2rem]">
            <div className="flex items-center gap-[3rem]">
                <Avatar
                    src={
                        'https://avatars.githubusercontent.com/u/167729556?v=4'
                    }
                    size={80}
                />
                <div>
                    <p className="text-[2.7rem] text-[#F8F8F8]">Lê Duy</p>
                    <p className="text-[2.1rem] text-[#5DD62C]">
                        Đặng Việt Quang (Mentor)
                    </p>
                </div>
            </div>
            <div className="mt-[2rem]">
                <p className="text-[1.8rem] font-normal italic text-[#F8F8F8]">
                    “Em xin cảm ơn anh vì sự hướng dẫn nhiệt tình và những kiến
                    thức quý báu anh đã chia sẻ. Nhờ anh, em đã tiến bộ rất
                    nhiều trong lĩnh vực IT. Em rất biết ơn và mong tiếp tục
                    nhận được sự hỗ trợ từ anh trong tương lai.”
                </p>
            </div>
            <div className="mt-[2rem] flex items-center justify-end gap-[0.8rem]">
                <p className="w-fit rounded-[0.8rem] bg-[#F8F8F8] px-[0.8rem] py-[0.4rem] text-[1.2rem] text-[#202020]">
                    Javascript
                </p>
                <p className="w-fit rounded-[0.8rem] bg-[#F8F8F8] px-[0.8rem] py-[0.4rem] text-[1.2rem] text-[#202020]">
                    Typescript
                </p>
                <p className="w-fit rounded-[0.8rem] bg-[#F8F8F8] px-[0.8rem] py-[0.4rem] text-[1.2rem] text-[#202020]">
                    .NET
                </p>
            </div>
        </div>
    );
}

export default ReviewMentee;
