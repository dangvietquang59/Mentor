import {
    GroupChatResponseType,
    GroupChatType,
} from '@/types/response/groupChat';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';
interface GroupChatProps {
    name: string;
    members: string[];
}
const groupChatApi = {
    async create(data: GroupChatProps, accessToken: string) {
        try {
            const res = await fetchData<GroupChatResponseType>(
                `${urls.GROUP_CHAT}`,
                accessToken,
                'POST',
                data,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling chat group API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling chat group API');
        }
    },
    async getById(accessToken: string, id: string) {
        try {
            const res = await fetchData<GroupChatResponseType[]>(
                `${urls.GROUP_CHAT}/${urls.USER}/${id}`,
                accessToken,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling chat group API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling chat group API');
        }
    },
    async search(query: string) {
        try {
            const params = new URLSearchParams({ query });
            const apiUrl = `${urls.GROUP_CHAT}/${urls.USER}/${urls.SEARCH}?${params.toString()}`;

            const res = await fetchData<GroupChatResponseType[]>(
                `${apiUrl}`,
                null,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling chat group API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling chat group API');
        }
    },
};
export default groupChatApi;
