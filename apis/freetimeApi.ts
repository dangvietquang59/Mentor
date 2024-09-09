import { FreeTimeResponseType } from '@/types/response/freetime';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';
interface FreetimeProps {
    freeDate: Date;
    startTime: string;
    endTime: string;
}
const freetimeApi = {
    async create(data: FreetimeProps, accessToken: string) {
        try {
            const res = await fetchData<FreeTimeResponseType>(
                `${urls.FREETIME}/${urls.CREATE_FREE_TIME}`,
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
    async getById(accessToken: string, id: string) {
        try {
            const res = await fetchData<FreeTimeResponseType[]>(
                `${urls.FREETIME}/${urls.GET_FREE_TIME}/${id}`,
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
    async delete(accessToken: string, id: string) {
        try {
            const res = await fetchData<FreeTimeResponseType[]>(
                `${urls.FREETIME}/${urls.DELETE_FREE_TIME}/${id}`,
                accessToken,
                'DELETE',
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
export default freetimeApi;
