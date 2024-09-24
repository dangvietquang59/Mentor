import { useForm } from 'react-hook-form';
import InputComponent from '../Input';
import SelectComponent from '../Select';
import { formValidation } from '@/utils/constants/formValidation';
import Editor from '../Editor';
import { useState } from 'react';
import ButtonCustom from '../ButtonCustom';

export type BlogFromProps = {
    title: string;
    tags: string[];
    content: string;
};
function BlogForm() {
    const [editorValue, setEditorValue] = useState<string>('');

    const handleEditorChange = (value: string) => {
        setEditorValue(value);
    };
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BlogFromProps>();
    const onSubmit = async (data: BlogFromProps) => {};

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
                rules={formValidation.date}
            />
            <SelectComponent control={control} label="Tags" name="tags" />

            <div className="flex flex-col gap-[0.8rem]">
                <p className="font-medium text-white">Content</p>
                <Editor
                    value={editorValue}
                    onChange={handleEditorChange}
                    className=""
                />
            </div>
            <ButtonCustom>Save</ButtonCustom>
        </form>
    );
}

export default BlogForm;
