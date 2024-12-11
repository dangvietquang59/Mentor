import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotAuthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex h-[30rem] w-[50rem] flex-col items-center justify-center gap-[1rem] rounded-lg bg-[#1A1A1A] p-8 text-center shadow-xl">
                <div className="flex justify-center">
                    <AlertCircle className="h-16 w-16 text-red-500" />
                </div>
                <h1 className="mt-4 text-3xl font-bold ">
                    401 - Không được ủy quyền
                </h1>
                <p className="mt-2 text-lg ">
                    Ối! Bạn không có quyền truy cập trang này.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block rounded-md bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}
