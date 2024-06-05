'use client';
import Image from 'next/image';
import images from '../../assets/img';
import Input from '../../components/Input';
import { useState } from 'react';
import Link from 'next/link';
function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className="mx-auto mt-[10rem] flex w-[40rem] flex-col">
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
                    <span className="text-[#7cb305]">Mentors system</span>
                </h2>
                <div className="my-[2.4rem] flex w-full flex-col gap-[1.2rem]">
                    <div>
                        <span className="text-[1.6rem] font-bold">Email</span>
                        <Input
                            placeHolder="enter your email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <span className="text-[1.6rem] font-bold">
                            Password
                        </span>
                        <Input
                            placeHolder="enter your password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <Link href={'/dashboard'}>
                        <button className="h-[4rem] w-full rounded-[0.8rem] bg-[#254000] p-[1rem] text-[1.4rem] font-bold text-white duration-300 hover:opacity-70">
                            Sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
