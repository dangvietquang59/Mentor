import { BookingRequestType } from '@/types/request/booking';
import {
    BookingCreateResponeType,
    BookingGetResponeType,
} from '@/types/response/booking';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const bookingApi = {
    async create(payload: BookingRequestType, token: string) {
        try {
            const res = await fetchData<BookingCreateResponeType>(
                urls.BOOKING,
                token,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling booking API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling booking API');
        }
    },
    async update(
        id: string,
        payload: { status: string; userId: string },
        token: string,
    ) {
        try {
            const res = await fetchData<BookingCreateResponeType>(
                `${urls.BOOKING}/${id}`,
                token,
                'PUT',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling booking API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling booking API');
        }
    },
    async getByUserId(
        id: string,
        token: string,
        date?: string,
        status?: string,
    ) {
        try {
            const newUrl = date
                ? `${urls.BOOKING}/${urls.USER}/${id}?date=${date}&status=${status}`
                : `${urls.BOOKING}/${urls.USER}/${id}`;
            const res = await fetchData<BookingGetResponeType[]>(
                `${newUrl}`,
                token,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling booking API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling booking API');
        }
    },
    async getById(id: string, token: string) {
        try {
            const res = await fetchData<BookingGetResponeType>(
                `${urls.BOOKING}/${id}`,
                token,
                'GET',
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling booking API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling booking API');
        }
    },
};

export default bookingApi;
