import { UserType } from '../user';

export type TagType = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};
export type BlogType = {
    tags: TagType[];
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
