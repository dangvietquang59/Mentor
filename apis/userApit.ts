import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const userApi = {
    async updateProfile(data: any, userId: string, accessToken: string) {
        try {
            const res = await fetchData<any>(
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
};

export default userApi;
