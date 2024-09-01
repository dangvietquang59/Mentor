import { LoginRequestType, RegisterRequestType } from '@/types/request/auth';
import { LoginResponseType } from '@/types/response/auth';
import { UserType } from '@/types/user';
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
    async register(payload: RegisterRequestType) {
        try {
            const res = await fetchData<LoginResponseType>(
                urls.REGISTER,
                null,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling register API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling register API');
        }
    },
    async getProfile(userId: string, accessToken: string) {
        try {
            const res = await fetchData<UserType>(
                `${urls.USERS}/${urls.GET_PROFILE}/${userId}`,
                accessToken,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling get profile API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling get profile API');
        }
    },
};

export default authApi;
