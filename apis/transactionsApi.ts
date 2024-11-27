import { TransferRequestType } from '@/types/request/transfer';
import urls from '@/utils/constants/urls';
import { fetchData } from '@/utils/functions/fetchData';

const transactionsApi = {
    async transfer(payload: TransferRequestType, token: string) {
        try {
            const res = await fetchData<any>(
                `${urls.TRANSACTIONS}/${urls.TRANSFER}`,
                token,
                'POST',
                payload,
            );
            return res;
        } catch (error: any) {
            console.error(
                'Error calling blog API:',
                error?.response?.data || error.message || error,
            );
            throw new Error('Error calling blog API');
        }
    },
};

export default transactionsApi;
