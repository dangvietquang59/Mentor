import { UserType } from '../user';

export type GroupChatType = {
    _id: string;
    name: string;
    members: string[];
};

export type GroupChatResponseType = {
    _id: string;
    name: string;
    members: UserType[];
};
