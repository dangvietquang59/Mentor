import { UserType } from './user';

export type Attachments = {
    filename: string;
    url: string;
    mimetype: string;
    _id: string;
};
export type MessageType = {
    user?: UserType;
    msg: string;
    time: string;
    id: string;
    attachments: Attachments[];
};
