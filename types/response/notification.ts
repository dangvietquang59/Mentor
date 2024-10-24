import { UserType } from '../user';

export type NotificationType = {
    _id: string;
    user: UserType;
    sender: UserType;
    content: string;
    entityType: string;
    entityId: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
};

export type NotificaitonResponseType = {
    notifications: NotificationType[];
    unreadCount: number;
};
