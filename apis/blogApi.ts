import { BlogFromProps } from '@/components/BlogForm';
import { BlogResponseType } from '@/types/response/blog';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const blogApi = {
    async create(payload: BlogFromProps, token: string) {
        try {
            const res = await fetchData<any>(
                `${urls.POSTS}/${urls.CREATE_NEW_POST}`,
                token,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling blog API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling blog API');
        }
    },
    async getAll() {
        try {
            const res = await fetchData<BlogResponseType>(
                `${urls.POSTS}/${urls.GET_ALL_BLOG}`,
                null,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling blog API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling blog API');
        }
    },
};

export default blogApi;
