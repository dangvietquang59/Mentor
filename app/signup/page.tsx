'use client';
import Image from 'next/image';
import images from '../../assets/img';
import icons from '@/assets/icons';
import InputComponent from '../../components/Input';
import { useState } from 'react';
import ButtonCustom from '@/components/ButtonCustom';
import { formValidation } from '@/utils/constants/formValidation';
import { useForm } from 'react-hook-form';
import authApi from '@/apis/authApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';

interface IRegisterProps {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
}
function SignUp() {
    const [step, setStep] = useState<number>(1);
    const [option, setOption] = useState<string>('');
    const arrayOption = ['Mentor', 'Mentee'];
    const router = useRouter();

    const handleNextStep = () => {
        setStep(2);
    };

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IRegisterProps>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });
    const onSubmit = async (data: IRegisterProps) => {
        const newMember = {
            ...data,
            role: option,
        };
        await authApi
            .register(newMember)
            .then((res) => {
                if (res) {
                    toast.success('Register successfull');
                    router.push(paths.SIGNIN);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const ChooseRole = () => {
        return (
            <div className="mx-auto mt-[10rem] flex w-full flex-col rounded-[0.8rem] bg-[#242526] p-[3rem] md:w-[50rem]">
                <div className="flex items-center justify-center">
                    <Image
                        src={images.logo}
                        alt="logo"
                        className="size-[10rem] rounded-[0.8rem]"
                    />
                </div>
                <div className="mt-[2.4rem]">
                    <div className="flex items-center justify-center">
                        <p className="text-center text-[2.4rem] font-medium md:text-nowrap">
                            Chào mừng đến với {''}
                            <span className="text-nowrap text-[2.4rem] font-medium text-[#5DD62C]">
                                Mentors system
                            </span>
                        </p>
                    </div>
                    <h3 className="mt-[2.4rem] text-[1.6rem]">
                        Để bắt đầu hãy cho chúng tôi biết bạn muốn trở thành?
                    </h3>

                    <ul className="mt-[2.4rem] flex flex-col gap-[1.2rem]">
                        {arrayOption.map((item, index) => (
                            <li
                                className={`flex h-[6rem] cursor-pointer items-center justify-center rounded-[8px] duration-300 ${option === item ? 'bg-[#5DD62C] text-black' : 'bg-[#1A1A1A] hover:opacity-50'}`}
                                key={index}
                                onClick={() => setOption(item)}
                            >
                                <p className="text-[2rem] font-medium">
                                    {item === 'Mentor' ? 'Cố vấn' : 'Người học'}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <ButtonCustom
                        onClick={handleNextStep}
                        className="mt-[2.4rem] w-full"
                    >
                        Tiếp tục
                    </ButtonCustom>
                </div>
            </div>
        );
    };
    const [password] = watch(['password']);
    return (
        <>
            {step === 1 && <ChooseRole />}

            {step === 2 && (
                <div className="mx-auto my-[2rem] flex w-full flex-col rounded-[0.8rem] bg-[#242526] p-[3rem] md:w-[50rem]">
                    <div className="flex items-center justify-center">
                        <Image
                            src={images.logo}
                            alt="logo"
                            className="h-[10rem] w-[10rem] rounded-[0.8rem]"
                        />
                    </div>
                    <div className="my-[2.4rem]">
                        <h2 className="text-center text-[2rem] font-bold">
                            Đăng ký với{' '}
                            <span className="text-[#7cb305]">
                                Mentors system
                            </span>
                        </h2>
                        <div className="my-[2.4rem] flex w-full flex-col gap-[1.2rem]">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-[2.4rem]"
                            >
                                <InputComponent
                                    control={control}
                                    name="fullName"
                                    label="Họ và tên"
                                    placeholder="David Abala"
                                    rules={formValidation.fullName}
                                    errors={errors.fullName}
                                    isRequired
                                />
                                <InputComponent
                                    control={control}
                                    name="email"
                                    label="Email"
                                    placeholder="example@gmail.com"
                                    rules={formValidation.email}
                                    errors={errors.email}
                                    isRequired
                                />

                                <InputComponent
                                    control={control}
                                    name="password"
                                    label="Mật khẩu"
                                    rules={formValidation.password}
                                    errors={errors.password}
                                    isPassword
                                    isRequired
                                />
                                <InputComponent
                                    control={control}
                                    name="confirmPassword"
                                    label="Xác nhận mật khẩu"
                                    rules={formValidation.confirmPassword(
                                        password,
                                    )}
                                    errors={errors.confirmPassword}
                                    isPassword
                                    isRequired
                                />
                                <button className="h-[4rem] w-full rounded-[0.8rem] bg-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white duration-300 hover:opacity-70">
                                    Đăng ký
                                </button>
                            </form>
                            {/* 
                            <div>
                                <p className="text-center text-[1.6rem] font-bold">
                                    Or sign up with
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-between gap-[2.4rem] md:flex-row">
                                <button className="flex w-full items-center gap-[0.8rem] rounded-[0.8rem] bg-black p-[1rem]">
                                    <Image src={icons.github} alt="icon" />
                                    <div className="flex flex-1 items-center justify-center">
                                        <span className="text-[1.6rem] font-bold text-white">
                                            Sign in with github
                                        </span>
                                    </div>
                                </button>
                                <button className=" flex w-full items-center gap-[0.8rem] rounded-[0.8rem] border-[0.1rem] border-[#ccc] p-[1rem]">
                                    <Image
                                        src={images.google}
                                        alt="icon"
                                        className="h-[2.4rem] w-[2.4rem]"
                                    />
                                    <div className="flex flex-1 items-center justify-center">
                                        <span className="font-bol text-[1.6rem]">
                                            Sign in with google
                                        </span>
                                    </div>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SignUp;
