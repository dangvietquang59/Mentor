import { cookies } from 'next/headers';

import variables from '../constants/variables';

export const getAccessTokenServer = () => {
    const accessToken = cookies().get(variables.ACCESS_TOKEN);

    if (accessToken) {
        return accessToken;
    }

    return null;
};
