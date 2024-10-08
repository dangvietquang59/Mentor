import { useForm } from 'react-hook-form';
import InputComponent from '../Input';
import { formValidation } from '@/utils/constants/formValidation';
import Editor from '../Editor';
import { useState } from 'react';
import ButtonCustom from '../ButtonCustom';
import { toast } from 'sonner';
import blogApi from '@/apis/blogApi';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';

export type BlogFromProps = {
    title: string;
    content: string;
};
function BlogForm() {
    const router = useRouter();
    const [editorValue, setEditorValue] = useState<string>('');
    const token = getAccessTokenClient();
    const handleEditorChange = (value: string) => {
        setEditorValue(value);
    };
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BlogFromProps>();
    const onSubmit = async (data: BlogFromProps) => {
        if (!editorValue) {
            toast.error('You need to enter content !');
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
                        toast.success('New blog created successfully');
                        router.push(paths.BLOGS);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
