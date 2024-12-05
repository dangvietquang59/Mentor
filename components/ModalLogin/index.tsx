import authApi from '@/apis/authApi';
import images from '@/assets/img';
import InputComponent from '@/components/Input';
import { formValidation } from '@/utils/constants/formValidation';
import paths from '@/utils/constants/paths';
import { Image, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import variables from '@/utils/constants/variables';
import { toast } from 'sonner';

interface ILoginType {
    email: string;
    password: string;
}
interface ModalLoginProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}
function ModalLogin({ open, handleOk, handleCancel }: ModalLoginProps) {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginType>();

    const onSubmit = async (data: ILoginType) => {
        await authApi
            .login(data)
            .then((res) => {
                if (res) {
                    router.push(paths.HOME);
                    if (res) {
                        Cookies.set(
                            variables.PROFILE,
                            JSON.stringify(res.data),
                        );
                        Cookies.set(variables.ACCESS_TOKEN, res.accessToken);
                        toast.success('Đăng nhập thành công');
                    }
                }
            })
            .catch(() => {
                toast.error('Đăng nhập thất bại');
            });
    };
    return (
        <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={null}
        >
            <div className="my-[2rem] flex w-full flex-col rounded-[0.8rem] bg-[#242526] p-[1rem] md:mx-auto md:w-[50rem] md:p-[3rem]">
                <div className="flex items-center justify-center">
                    <Image
                        src={images.logo.src}
                        alt="logo"
                        className="h-[10rem] w-[10rem] rounded-[0.8rem]"
                    />
                </div>
                <div className="my-[2.4rem]">
                    <h2 className="text-center text-[2rem] font-bold">
                        Sign in with{' '}
                        <span className="text-[#5dd62c]">Mentors system</span>
                    </h2>

                    <div className="my-[2.4rem] flex w-full flex-col gap-[1.2rem]">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-[2.4rem]"
                        >
                            <InputComponent
                                control={control}
                                name="email"
                                label="Email"
                                placeholder="example@gmail.com"
                                rules={formValidation.email}
                                errors={errors.email}
                            />

                            <InputComponent
                                control={control}
                                name="password"
                                label="Password"
                                rules={formValidation.password}
                                errors={errors.password}
                                isPassword
                            />
                            <button className="h-[4rem] w-full rounded-[0.8rem] bg-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white duration-300 hover:opacity-70">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalLogin;
