import Cookies from 'js-cookie';
import variables from '@/utils/constants/variables';

export const getProfile = () => {
    const profile = Cookies.get(variables.PROFILE);

    if (profile) {
        try {
            return JSON.parse(profile);
        } catch (error) {
            console.error('Failed to parse profile from cookie', error);
            return null;
        }
    }

    return null;
};
