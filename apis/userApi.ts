import { UserTypeRespone } from '@/types/response/user';
import { UserType } from '@/types/user';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';
import { stringify } from 'querystring';

interface ParamsProps {
    role: string; // Role of the user
    page: number; // Current page number
    experiencesYear?: number; // Years of experience (optional)
    jobtitle?: string[]; // Array of job titles (optional)
    technology?: string[]; // Array of technology IDs (optional)
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
            // Build query string from params
            const queryString = stringify({
                role: params.role,
                page: params.page,
                experiencesYear: params.experiencesYear,
                jobtitle: params.jobtitle,
                technology: params.technology,
            });

            // Fetch data with query string included in the URL
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
