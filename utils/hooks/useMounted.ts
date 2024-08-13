import { useEffect, useState } from 'react';

export const useMounted = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, [mounted]);

    if (mounted) return true;
    else return null;
};
