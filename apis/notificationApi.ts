import { NotificaitonResponseType } from '@/types/response/notification';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

interface NotificationProp {
    isRead: boolean;
}
const notificationApi = {
    async getByUserId(id: string, token: string) {
        try {
            const res = await fetchData<NotificaitonResponseType>(
                `${urls.NOTIFICATIONS}/${urls.USER}/${id}`,
                token,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling notifications API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling notifications API');
        }
    },
    async update(id: string, payload: NotificationProp, token: string) {
        try {
            const res = await fetchData<NotificaitonResponseType>(
                `${urls.NOTIFICATIONS}/${id}`,
                token,
                'PUT',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling notifications API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling notifications API');
        }
    },
};

export default notificationApi;
