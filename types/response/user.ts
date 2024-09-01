import { UserType } from '../user';

export type UserTypeRespone = {
    users: UserType[];
    currentPage: string;
    totalPages: number;
    totalUsers: number;
};
