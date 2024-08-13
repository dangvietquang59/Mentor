import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
    exp: number;
};

const isTokenExpired = (token: string | undefined): boolean => {
    if (!token) return true;

    try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000; // current time in seconds
        return decoded.exp < now;
    } catch (e) {
        return true; // If token is invalid, consider it expired
    }
};

export default isTokenExpired;
