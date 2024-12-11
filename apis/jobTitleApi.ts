import {
    JobtitleResponeType,
    JobtitleResponseTitle,
} from '@/types/response/jobTitle';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const jobTitleApi = {
    async getAll(page?: number) {
        try {
            const res = await fetchData<JobtitleResponeType>(
                `${urls.JOB_TITLE}?page=${page}`,
                null,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling job title API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling job title API');
        }
    },
    async getByName(name: string) {
        try {
            const res = await fetchData<JobtitleResponseTitle>(
                `${urls.JOB_TITLE}/${urls.TITLE}?name=${name}`,
                null,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling job title API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling job title API');
        }
    },
};

export default jobTitleApi;
