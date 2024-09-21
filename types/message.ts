import { UserType } from './user';

export type MessageType = {
    user?: UserType;
    msg: string;
    time: string;
    id: string;
    attachments: {
        filename: string;
        url: string;
        mimetype: string;
        _id: string;
    }[];
};
