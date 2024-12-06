import { UserType } from '../user';

export type BookingCreateResponeType = {
    menteeId: string;
    freetimeDetailId: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
};
export type FreetimeDetailType = {
    _id: string;
    freeTimeId: string;
    name: string;
    from: string;
    to: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};
export type BookingGetResponeType = {
    _id: string;
    participants: UserType[];
    freetimeDetailId: FreetimeDetailType;
    status: string;
    createdAt: string;
    updatedAt: string;
    from: string;
    to: string;
    amount: number;
};
