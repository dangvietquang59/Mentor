import { UserType } from './user';

export type MessageType = {
    user?: UserType;
    msg: string;
    time: string;
    id: string;
};
