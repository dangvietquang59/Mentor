import paymentApi from '@/apis/paymentApi';
import images from '@/assets/img';
import ButtonCustom from '@/components/ButtonCustom';
import { formatNumeric } from '@/utils/functions/formatNumeric';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

interface ModalCoinProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}
interface PriceCoinProps {
    coin: number;
}

function ModalCoin({ open, handleCancel, handleOk }: ModalCoinProps) {
    const coins = [
        100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000,
    ];
    const [selectedCoins, setSelectedCoins] = useState<number>(0);
    const token = getAccessTokenClient();
    const PriceCoin = ({ coin }: PriceCoinProps) => {
        return (
            <button
                className={`flex h-40 transform flex-col items-center justify-center gap-2 rounded-xl ${selectedCoins === coin ? 'bg-green-500' : 'bg-gray-700'} p-4 text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl`}
                onClick={() => setSelectedCoins(coin)}
            >
                <Image src={images.qCoin} alt="icon" width={50} height={50} />
                <span className="text-lg font-medium">
                    {formatNumeric(coin)} đ
                </span>
            </button>
        );
    };
    const handleDepositCoins = async () => {
        if (token) {
            const amount = selectedCoins;

            const dataPayment = {
                amount: amount,
            };
            const response = await paymentApi.create(dataPayment, token);
            if (response?.vnpUrl) {
                window.location.replace(response.vnpUrl);
                return;
            } else {
                console.log('Không nhận được URL thanh toán.');
                toast.error('Không thể tạo thanh toán.');
            }
        }
    };

    return (
        <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            centered
        >
            <div className="flex flex-col gap-6 p-6">
                <h2 className="text-center text-2xl font-bold text-white">
                    Nạp tiền cá nhân
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    {coins.map((coin, index) => (
                        <PriceCoin key={index} coin={coin} />
                    ))}
                </div>
                <p className="text-[1.4rem] text-white">
                    Số tiền nạp: {formatNumeric(selectedCoins) || 0} đ
                </p>
                <ButtonCustom className="mt-4" onClick={handleDepositCoins}>
                    Xác nhận
                </ButtonCustom>
            </div>
        </Modal>
    );
}

export default ModalCoin;
