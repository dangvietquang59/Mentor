import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface MyEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string; // Thêm className vào props
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
            />
        </div>
    );
};

export default Editor;
