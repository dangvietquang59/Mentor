import Cookies from 'js-cookie';

import variables from '../constants/variables';

export const getAccessTokenClient = () => {
    const accessToken = Cookies.get(variables.ACCESS_TOKEN);

    if (accessToken) {
        return accessToken;
    }

    return null;
};
