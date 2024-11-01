import { PaymentType } from '@/types/response/payment';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

interface PaymentProps {
    amount: number;
}
const paymentApi = {
    async create(payload: PaymentProps, token: string) {
        try {
            const res = await fetchData<PaymentType>(
                `${urls.PAYMENT}/${urls.CREATE_PAYMENT}`,
                token,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling payment API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling payment API');
        }
    },
};

export default paymentApi;
