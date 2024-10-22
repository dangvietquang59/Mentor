'use client';
import BlogForm from '@/components/BlogForm';
import { useParams } from 'next/navigation';

function BlogEdit() {
    const { slug } = useParams();
    return (
        <div className="mx-[5%] mt-[2.4rem]">
            <BlogForm slug={slug} />
        </div>
    );
}

export default BlogEdit;
