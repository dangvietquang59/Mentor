import { CommentResponseType } from '@/types/response/comments';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

interface CommentProps {
    postId: string;
    userId: string;
    content: string;
    parent?: string;
}
const commentApi = {
    async create(payload: CommentProps, token: string) {
        try {
            const res = await fetchData<any>(
                urls.COMMENTS,
                token,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling comment API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling comment API');
        }
    },
    async getCommentByPost(id: string) {
        try {
            const res = await fetchData<CommentResponseType>(
                `${urls.COMMENTS}/${urls.POST}/${id}`,
                null,
                'GET',
                null,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling comment API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling comment API');
        }
    },
};

export default commentApi;
