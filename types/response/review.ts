import { UserType } from '../user';
import { BookingGetResponeType } from './booking';
import { TechnologiesType } from './technologies';

export type ReviewType = {
    _id: string;
    user: UserType;
    bookingId: BookingGetResponeType;
    content: string;
    point: string;
    technologies: TechnologiesType[];
    createdAt: string;
    updatedAt: string;
};
export type ReviewResponseType = {
    totalPages: number;
    currentPage: number;
    reviews: ReviewType[];
};
