'use client';
import Image from 'next/image';
import images from '../../assets/img';
import Link from 'next/link';
import icons from '@/assets/icons';
import InputComponent from '../../components/Input';
function SignUp() {
    return (
        <div className="mx-auto mt-[10rem] flex w-[50rem] flex-col rounded-[0.8rem] border-[0.1rem] border-[#ccc] p-[3rem]">
            <div className="flex items-center justify-center">
                <Image
                    src={images.logo}
                    alt="logo"
                    className="h-[10rem] w-[10rem] rounded-[0.8rem]"
                />
            </div>
            <div className="my-[2.4rem]">
                <h2 className="text-center text-[2rem] font-bold">
                    Sign up with{' '}
                    <span className="text-[#7cb305]">Mentors system</span>
                </h2>
                <div className="my-[2.4rem] flex w-full flex-col gap-[1.2rem]">
                    <div>
                        <span className="text-[1.6rem] font-bold">Email</span>
                        <InputComponent type="email" name="email" />
                    </div>
                    <div>
                        <span className="text-[1.6rem] font-bold">
                            Password
                        </span>
                        <InputComponent type="email" name="email" />
                    </div>
                    <Link href={'/dashboard'}>
                        <button className="h-[4rem] w-full rounded-[0.8rem] bg-[#254000] p-[1rem] text-[1.4rem] font-bold text-white duration-300 hover:opacity-70">
                            Sign up
                        </button>
                    </Link>
                    <div>
                        <p className="text-center text-[1.6rem] font-bold">
                            Or sign up with
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-[0.8rem] rounded-[0.8rem] bg-black p-[1rem]">
                            <Image src={icons.github} alt="icon" />
                            <span className="text-[1.6rem] font-bold text-white">
                                Sign up with github
                            </span>
                        </button>
                        <button className=" flex items-center gap-[0.8rem] rounded-[0.8rem] border-[0.1rem] border-[#ccc] p-[1rem]">
                            <Image
                                src={images.google}
                                alt="icon"
                                className="h-[2.4rem] w-[2.4rem]"
                            />
                            <span className="font-bol text-[1.6rem]">
                                Sign up with google
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
