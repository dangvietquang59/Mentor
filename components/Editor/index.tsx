import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uploadApi from '@/apis/uploadApi';

interface MyEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const Editor: React.FC<MyEditorProps> = ({ value, onChange, className }) => {
    return (
        <div className={className}>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
            />
        </div>
    );
};

function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
        loader: any,
    ) => {
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    private loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(async (file: File) => {
            const response = await uploadApi.uploadFile(file);

            const imageUrl = response?.result?.url;

            if (imageUrl) {
                return {
                    default: imageUrl,
                };
            } else {
                throw new Error('Upload failed');
            }
        });
    }

    abort() {
        console.log('Upload cancelled');
    }
}

export default Editor;
