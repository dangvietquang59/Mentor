import { FreetimeSessionDetails } from '@/components/FreetimeForm';
import { FreeTimeResponseType, FreeTimeType } from '@/types/response/freetime';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';
interface FreetimeProps {
    freeDate: string;
    freeTimeDetail: FreetimeSessionDetails[];
    repeatDays: number[];
}
const freetimeApi = {
    async create(data: FreetimeProps, accessToken: string) {
        try {
            const res = await fetchData<FreeTimeType>(
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
    async getById(accessToken: string, id: string, params: { page: number }) {
        try {
            const res = await fetchData<FreeTimeResponseType>(
                `${urls.FREETIME}/${urls.GET_FREE_TIME}/${id}?page=${params?.page}`,
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
            const res = await fetchData<FreeTimeType[]>(
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
    async deleteDetails(accessToken: string, id: string) {
        try {
            const res = await fetchData<any>(
                `${urls.FREETIME_DETAILS}/${id}`,
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
