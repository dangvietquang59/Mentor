import { UserType } from '../user';

export type CommentType = {
    _id: string;
    userId: UserType;
    postId: string;
    parent: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    children: CommentType[];
};

export type CommentResponseType = {
    success: boolean;
    totalComments: number;
    comments: CommentType[];
};
