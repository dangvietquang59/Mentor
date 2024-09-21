import { MessageRespone, MessageResponseType } from '@/types/response/messages';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';
// interface MessageProps {
//     senderId: string;
//     content: string;
//     groupId: string;
// }
const messageApi = {
    async create(data: FormData, accessToken: string) {
        try {
            const res = await fetchData<MessageRespone>(
                `${urls.MESSAGES}`,
                accessToken,
                'POST',
                data,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling freetime API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling freetime API');
        }
    },
    async getByGroup(id: string, accessToken: string) {
        try {
            const res = await fetchData<MessageResponseType[]>(
                `${urls.MESSAGES}/${urls.GROUP}/${id}`,
                accessToken,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling freetime API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling freetime API');
        }
    },
};
export default messageApi;
