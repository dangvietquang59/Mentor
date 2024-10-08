import { JobtitleResponeType } from '@/types/response/jobTitle';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const jobTitleApi = {
    async getAll() {
        try {
            const res = await fetchData<JobtitleResponeType>(
                urls.JOB_TITLE,
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
