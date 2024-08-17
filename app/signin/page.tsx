'use client';
import Image from 'next/image';
import images from '../../assets/img';
import icons from '@/assets/icons';
import { toast } from 'sonner';
import InputComponent from '../../components/Input';
import { formValidation } from '@/utils/constants/formValidation';
import { useForm } from 'react-hook-form';
import authApi from '@/apis/authApi';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';
import variables from '@/utils/constants/variables';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';

interface ILoginType {
    email: string;
    password: string;
}
function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const isLoggedIn = getAccessTokenClient();
    useEffect(() => {
        if (isLoggedIn) {
            router.push(paths.DASHBOARD);
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn, router]);
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
                    router.push(paths.DASHBOARD);
                    if (res) {
                        Cookies.set(
                            variables.PROFILE,
                            JSON.stringify(res.data),
                        );
                        Cookies.set(variables.ACCESS_TOKEN, res.accessToken);
                        toast.success('Login successfull');
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Login failed');
            });
    };
    return (
        <div className="my-[2rem] flex w-full flex-col rounded-[0.8rem] bg-[#1C1E21] p-[3rem] md:mx-auto md:w-[50rem]">
            <div className="flex items-center justify-center">
                <Image
                    src={images.logo}
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
                            placeholder="**************"
                            rules={formValidation.password}
                            errors={errors.password}
                            isPassword
                        />
                        <button className="h-[4rem] w-full rounded-[0.8rem] bg-[#5dd62c] p-[1rem] text-[1.4rem] font-bold text-white duration-300 hover:opacity-70">
                            Sign in
                        </button>
                    </form>

                    <div>
                        <p className="text-center text-[1.6rem] font-bold">
                            Or sign in with
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
