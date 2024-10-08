import { UserType } from '../user';

export type BlogType = {
    tags: any[];
    likes: [];
    comments: [];
    _id: string;
    title: string;
    content: string;
    userId: UserType;
    slug: string;
    createdAt: string;
    updatedAt: string;
};
export type BlogResponseType = {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    posts: BlogType[];
};
