import { UserType } from '../user';

export type MessageResponseType = {
    _id: string;
    sender: UserType;
    content: string;
    group: string;
    attachments?: [];
    timestamp: string;
};

export type MessageRespone = {
    message: string;
    data: MessageResponseType;
};
