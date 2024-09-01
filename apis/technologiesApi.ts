import { TechnologiesResponeType } from '@/types/response/technologies';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const technologiesApi = {
    async getAll() {
        try {
            const res = await fetchData<TechnologiesResponeType[]>(
                urls.TECHNOLOGIES,
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
