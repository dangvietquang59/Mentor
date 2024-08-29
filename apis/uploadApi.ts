import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const uploadApi = {
    async uploadFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetchData<any>(
                urls.UPLOAD,
                null,
                'POST',
                formData,
                false,
            );
            return res;
        } catch (error) {
            console.error('Error calling upload API:', error);
            throw new Error('Error calling upload API');
        }
    },
};

export default uploadApi;
