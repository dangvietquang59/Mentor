'use client';

import paths from '@/utils/constants/paths';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(paths.DASHBOARD);
    }, [router]);

    return null;
};

export default Home;
