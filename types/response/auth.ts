import { UserType } from '@/types/user';

export type LoginResponseType = {
    message: string;
    data: UserType;
    accessToken: string;
    refreshToken: string;
};
