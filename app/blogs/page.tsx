import icons from '@/assets/icons';
import BlogItem from '@/components/BlogItem';
import BlogTag from '@/components/BlogTag';
import Image from 'next/image';

function Blog() {
    const arrayBlog = [
        {
            author: 'Đặng Việt Quang',
            time: '12 giờ',
            content: `
            Mn tư vấn cho e logic Refresh Token khi Access Token sắp hết hạn với fetch với ạ. E mò mãi vẫn không dc, search google cũng chỉ toàn NextAuth. Có project mẫu càng tốt ạ, e cảm ơn.
            --- Hay là mình chuyển sang dùng axios + react query cho tiện mn?
          `,
        },
        {
            author: 'Nguyễn Thị Mai',
            time: '2 ngày trước',
            content: `
            Mn có ai đã từng làm về WebSockets chưa? Mình đang cần truyền tải dữ liệu real-time giữa server và client nhưng chưa rõ nên bắt đầu từ đâu. Mong mn chia sẻ kinh nghiệm với!
            --- Mình có dùng qua Firebase Realtime Database nhưng có vẻ không phù hợp cho dự án hiện tại.
          `,
        },
        {
            author: 'Trần Hữu Phước',
            time: '3 giờ trước',
            content: `
            Mình đang tìm hiểu về cách triển khai một ứng dụng Node.js trên AWS Lambda. Có tài liệu nào chi tiết không mn? Cảm ơn mn trước!
            --- Đã thử qua vài cách trên YouTube nhưng vẫn chưa thực sự hiệu quả.
          `,
        },
        {
            author: 'Lê Minh Tuấn',
            time: '5 ngày trước',
            content: `
            Mn cho hỏi giữa RESTful API và GraphQL thì cái nào tối ưu hơn cho ứng dụng mobile? Có ai đã có kinh nghiệm sử dụng chưa? Chia sẻ cho mình với.
            --- Đang cân nhắc chuyển từ REST sang GraphQL mà vẫn còn lăn tăn.
          `,
        },
        {
            author: 'Phạm Anh Khoa',
            time: '8 giờ trước',
            content: `
            Mn có ai đã từng sử dụng Next.js để xây dựng ứng dụng e-commerce chưa? Mình đang cần tư vấn về cách tối ưu SEO và tốc độ tải trang.
            --- Đã thử qua Nuxt.js nhưng chưa ưng ý, chuyển sang Next.js thử xem sao.
          `,
        },
    ];

    return (
        <div className="mx-[10%] mt-[2.4rem] grid min-h-[100vh] grid-cols-[60%_40%] gap-[1.6rem]">
            <div className="grid gap-[2.4rem]">
                {arrayBlog &&
                    arrayBlog.map((item, index) => (
                        <BlogItem
                            key={index}
                            author={item.author}
                            time={item.time}
                            content={item.content}
                        />
                    ))}
            </div>
            <div className="sticky top-[13%] max-h-[50rem] rounded-[0.8rem] bg-[#242526] p-[2rem]">
                {/* search */}
                <div className="flex w-full items-center gap-[0.8rem] rounded-full bg-[#3A3B3C] p-[1rem]">
                    <Image src={icons.searchGrey} alt="icon" />
                    <input
                        placeholder="search"
                        className="h-full w-full bg-transparent text-[1.6rem] focus-within:outline-none"
                    />
                </div>
                {/* tag  */}

                <div className="mt-[2.4rem]">
                    <h2 className="text-[2rem] font-bold">Blog tag</h2>
                    <div className="mt-[2.4rem] flex flex-wrap gap-[0.8rem]">
                        <BlogTag />
                        <BlogTag />
                        <BlogTag />
                        <BlogTag />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
