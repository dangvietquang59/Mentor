import { BlogFromProps } from '@/components/BlogForm';
import { ReviewRequestType } from '@/types/request/review';
import { ReviewResponseType } from '@/types/response/review';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const reviewApi = {
    async create(payload: ReviewRequestType, token: string) {
        try {
            const res = await fetchData<ReviewRequestType>(
                `${urls.REVIEWS}`,
                token,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling review API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling review API');
        }
    },
    async getByUserId(id: string, token: string) {
        try {
            const res = await fetchData<ReviewResponseType>(
                `${urls.REVIEWS}/${urls.USER}/${id}`,
                token,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling review API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling review API');
        }
    },
};

export default reviewApi;
