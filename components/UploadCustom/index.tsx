import { Upload, UploadProps } from 'antd';
import ButtonCustom from '../ButtonCustom';
import urls from '@/utils/constants/urls';

interface UploadCustomProps {}
function UploadCustom() {
    const props: UploadProps = {
        action: `${process.env.NEXT_PUBLIC_API_URL}/${urls.UPLOAD}`,
        listType: 'picture',
        beforeUpload(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result as string;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        const ctx = canvas.getContext('2d')!;
                        ctx.drawImage(img, 0, 0);
                        ctx.fillStyle = 'red';
                        ctx.textBaseline = 'middle';
                        ctx.font = '33px Arial';
                        ctx.fillText('Ant Design', 20, 20);
                        canvas.toBlob((result) => resolve(result as Blob));
                    };
                };
            });
        },
    };
    return (
        <Upload {...props}>
            <div className="flex items-center gap-[0.8rem]">
                <p className="text-[1.4rem] text-white">Upload image:</p>
                <ButtonCustom>Upload</ButtonCustom>
            </div>
        </Upload>
    );
}

export default UploadCustom;
