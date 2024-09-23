import paths from '../constants/paths';
import variables from '../constants/variables';
import isTokenExpired from './isTokenExpired';
import Cookies from 'js-cookie';

export const fetchData = async <T>(
    endpoint: string,
    token?: string | null,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: string | FormData | object | null,
    isSearch: boolean = false,
    additionalHeaders: Record<string, string> = {},
): Promise<T | undefined> => {
    const headers: Record<string, string> = {};

    if (token) {
        if (isTokenExpired(token)) {
            Cookies.remove(variables.ACCESS_TOKEN);
            Cookies.remove(variables.ROLE);
            Cookies.remove(variables.PROFILE);

            if (typeof window !== 'undefined') {
                window.location.href = paths.HOME;
            }
            return;
        }

        headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(body instanceof FormData) && method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }

    Object.assign(headers, additionalHeaders);

    const config: RequestInit = {
        method,
        headers,
    };

    if (body && method !== 'GET') {
        config.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    try {
        const apiUrl = isSearch
            ? process.env.NEXT_PUBLIC_SEARCH_API_URL
            : process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/${endpoint}`, config);

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Network response was not ok: ${errorDetails}`);
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
