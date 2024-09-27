import images from '@/assets/img';
import { Image, Modal } from 'antd';
import InputComponent from '../Input';
import UploadCustom from '../UploadCustom';
import ButtonCustom from '../ButtonCustom';
import { useForm } from 'react-hook-form';

function DepositCoinModal() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();
    const onSubmit = async (data: any) => {};
    return (
        <Modal
            // open={isModalOpen}
            // onOk={handleOk}
            // onCancel={handleCancel}
            footer={null}
            closable={false}
        >
            <div className="flex flex-col gap-[2.4rem]">
                <h2 className="text-center text-[3rem] font-bold text-white">
                    Deposit coins
                </h2>
                <div className="flex items-center justify-center">
                    <div className=" size-[20rem]">
                        <Image src={images.qrMomo.src} alt="qr" />
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[2.4rem]"
                >
                    <InputComponent
                        control={control}
                        name="fullName"
                        label="Total amount"
                        placeholder="totalAmount"
                    />
                    <UploadCustom />
                    <ButtonCustom>Send request</ButtonCustom>
                </form>
            </div>
        </Modal>
    );
}

export default DepositCoinModal;
