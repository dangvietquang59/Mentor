'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

    return null; // Trả về null thay vì một fragment rỗng
};

export default Home;
