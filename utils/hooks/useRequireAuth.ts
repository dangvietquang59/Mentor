import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import paths from '@/utils/constants/paths';

/**
 * Hook to redirect to the login page if no authentication token is present.
 * @param token The authentication token to check.
 */
const useRequireAuth = (token: string | null) => {
    const router = useRouter();

    useEffect(() => {
        // If the token is not present, redirect to the login page
        if (!token) {
            router.push(paths.SIGNIN);
        }
    }, [token, router]); // Depend on token and router to rerun if either changes
};

export default useRequireAuth;
