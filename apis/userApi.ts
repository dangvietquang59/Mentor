import { UserTypeRespone } from '@/types/response/user';
import { UserType } from '@/types/user';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';
import { stringify } from 'querystring';

interface ParamsProps {
    role: string;
    page: number;
}
const userApi = {
    async updateProfile(data: UserType, userId: string, accessToken: string) {
        try {
            const res = await fetchData<UserType>(
                `${urls.USERS}/${urls.UPDATE_PROFILE}/${userId}`,
                accessToken,
                'PUT',
                data,
                false,
            );
            return res;
        } catch (error) {
            console.error('Error calling update profile API:', error);
            throw new Error('Error calling update profile API');
        }
    },
    async updateProfileImage(data: any, userId: string, accessToken: string) {
        try {
            const res = await fetchData<any>(
                `${urls.USERS}/${urls.UPDATE_PROFILE_IMAGE}/${userId}`,
                accessToken,
                'PUT',
                data,
                false,
            );
            return res;
        } catch (error) {
            console.error('Error calling update profile API:', error);
            throw new Error('Error calling update profile API');
        }
    },
    async getAll(params: ParamsProps) {
        try {
            const queryString = new URLSearchParams({
                role: params.role,
                page: params.page.toString(),
            }).toString();

            const res = await fetchData<UserTypeRespone>(
                `${urls.USERS}/${urls.GET_ALL_USERS}?${queryString}`,
                null,
                'GET',
                null,
                false,
            );

            return res;
        } catch (error) {
            console.error('Error calling get all users API:', error);
            throw new Error('Error calling get all users API');
        }
    },
};

export default userApi;
