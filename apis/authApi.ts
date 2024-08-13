import { LoginRequestType } from '@/types/request/login';
import { LoginResponseType } from '@/types/response/login';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const authApi = {
    async login(payload: LoginRequestType) {
        try {
            const res = await fetchData<LoginResponseType>(
                urls.LOGIN,
                null,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling login API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling login API');
        }
    },
};

export default authApi;
