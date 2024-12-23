import { BlogFromProps } from '@/components/BlogForm';
import { BlogResponseType, BlogType } from '@/types/response/blog';
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
    async update(id: string, payload: BlogFromProps, token: string) {
        try {
            const res = await fetchData<BlogType>(
                `${urls.POSTS}/${urls.UPDATE_POST}/${id}`,
                token,
                'PUT',
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
    async delete(id: string, token: string) {
        try {
            const res = await fetchData<BlogType>(
                `${urls.POSTS}/${urls.DELETE_POST}/${id}`,
                token,
                'DELETE',
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
    async getAll(page: number, search: string, tagIds: string[]) {
        try {
            const res = await fetchData<BlogResponseType>(
                `${urls.POSTS}/${urls.GET_ALL_BLOG}?search=${search}&page=${page}&tagIds=${tagIds}`,
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
    async getBySlug(slug: string) {
        try {
            const res = await fetchData<BlogType>(
                `${urls.POSTS}/${urls.GET_POST_BY_SLUG}/${slug}`,
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
