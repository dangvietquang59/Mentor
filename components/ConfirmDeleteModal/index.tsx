import { Modal } from 'antd';
import ButtonCustom from '../ButtonCustom';

interface ConfirmDeleteModalProps {
    isModalOpen: boolean;
    content: string;
    handleOk?: () => void;
    handleCancel?: () => void;
}
function ConfirmDeleteModal({
    isModalOpen,
    content,
    handleOk,
    handleCancel,
}: ConfirmDeleteModalProps) {
    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={null}
            closable={false}
        >
            <div className="flex flex-col gap-[2.4rem]">
                <h2 className="text-center text-[1.8rem] font-bold text-white">
                    Verify deleting the record
                </h2>
                <p className="text-center text-[1.6rem] text-white">
                    {content}
                </p>
                <div className="grid grid-cols-2 gap-[1.2rem]">
                    <ButtonCustom outline onClick={handleCancel}>
                        Cancel
                    </ButtonCustom>
                    <ButtonCustom onClick={handleOk}>Delete</ButtonCustom>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDeleteModal;
