import { TagsResponseType } from '@/types/response/tags';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const tagsApi = {
    async get(token: string) {
        try {
            const res = await fetchData<TagsResponseType>(
                `${urls.TAGS}`,
                token,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling tags API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling tags API');
        }
    },
};

export default tagsApi;
