import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import InputComponent from '../Input';
import { formValidation } from '@/utils/constants/formValidation';
import ButtonCustom from '../ButtonCustom';
import { toast } from 'sonner';
import blogApi from '@/apis/blogApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';
import { BlogType } from '@/types/response/blog';

const Editor = dynamic(() => import('../Editor'), { ssr: false });

export type BlogFromProps = {
    title: string;
    content: string;
};

interface EditForm {
    slug?: string | string[];
}

function BlogForm({ slug }: EditForm) {
    const router = useRouter();
    const resolvedId = Array.isArray(slug) ? slug[0] : slug;
    const [editorValue, setEditorValue] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [blog, setBlog] = useState<BlogType>();

    useEffect(() => {
        const fetchBlog = async () => {
            if (resolvedId) {
                await blogApi
                    .getBySlug(resolvedId)
                    .then((res) => {
                        if (res) {
                            setBlog(res);
                            setValue('title', res?.title);
                            setEditorValue(res?.content);
                        }
                    })
                    .catch((error) => console.log(error));
            }
        };
        fetchBlog();
    }, []);

    useEffect(() => {
        const clientToken = getAccessTokenClient();
        if (clientToken) {
            setToken(clientToken);
        }
    }, []);

    const handleEditorChange = (value: string) => {
        setEditorValue(value);
    };

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BlogFromProps>();

    const onSubmit = async (data: BlogFromProps) => {
        if (!editorValue) {
            toast.error('Bạn cần nhập nội dung để hoàn tất');
            return;
        }
        if (isEdit) {
            const updateData = {
                ...data,
                content: editorValue,
            };
            if (blog && token) {
                await blogApi
                    .update(blog?._id, updateData, token)
                    .then((res) => {
                        if (res) {
                            toast.success('Cập nhật bài viết thành công');
                            router.push(paths.BLOGS);
                        }
                    })
                    .catch(() => toast.error('Cập nhật bài viết lỗi'));
            }
            return;
        }
        const newData = {
            ...data,
            content: editorValue,
        };

        if (token) {
            await blogApi
                .create(newData, token)
                .then((res) => {
                    if (res) {
                        toast.success('Lưu thành công');
                        router.push(paths.BLOGS);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Lưu thất bại');
                });
        }
    };

    useEffect(() => {
        if (resolvedId) {
            setIsEdit(true);
        }
    }, [resolvedId]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[2.4rem]"
        >
            <InputComponent
                control={control}
                name="title"
                label="Blog title"
                placeholder="Blog title"
                rules={formValidation.blogTitle}
            />

            <div className="flex flex-col gap-[0.8rem]">
                <p className="font-medium text-white">Content</p>
                <Editor
                    value={editorValue}
                    onChange={handleEditorChange}
                    className="text-[1.6rem] text-black"
                />
            </div>

            <ButtonCustom type="submit">Save</ButtonCustom>
        </form>
    );
}

export default BlogForm;
