import blogApi from '@/apis/blogApi'; // Đảm bảo blogApi đúng đường dẫn
import icons from '@/assets/icons';
import images from '@/assets/img';
import ActionBlog from '@/components/ActionBlog';
import { formatDate } from '@/utils/functions/formatDate';
import { Avatar } from 'antd';
import Image from 'next/image';

interface Params {
    slug: string;
}

interface BlogDetailsProps {
    params: Params;
}

const BlogDetails = async ({ params }: BlogDetailsProps) => {
    const { slug } = params;

    const blog = await blogApi.getBySlug(slug);

    if (!blog) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-[2rem] font-bold">Blog not found 404</p>
            </div>
        );
    }

    return (
        <div className="mx-[10%] mt-[2.4rem]">
            <div className="grid grid-cols-[30%_70%] gap-[1.2rem]">
                <ActionBlog blog={blog} />
                <div className="h-full w-full rounded-[0.8rem] bg-[#2D2F2E] p-[2rem]">
                    <h2 className="mt-[2.4rem] text-center text-[4rem] font-bold">
                        {blog?.title}
                    </h2>
                    <div
                        className="mt-[2.4rem] text-[1.6rem]"
                        dangerouslySetInnerHTML={{ __html: blog?.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
