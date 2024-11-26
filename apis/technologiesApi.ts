import {
    TechnologiesResponseType,
    TechnologiesType,
} from '@/types/response/technologies';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const technologiesApi = {
    async getAll(page?: number) {
        try {
            const res = await fetchData<TechnologiesResponseType>(
                `${urls.TECHNOLOGIES}?page=${page}`,
                null,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling technologies API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling technologies API');
        }
    },
};
export default technologiesApi;
