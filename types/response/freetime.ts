export type FreeTimeDetailType = {
    _id: string;
    freeTimeId: string;
    name: string;
    from: string;
    to: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};
export type FreeTimeType = {
    _id: string;
    userId: string;
    freeDate: string;
    freeTimeDetail: FreeTimeDetailType[];
    createdAt: string;
    updatedAt: string;
};
export type FreeTimeResponseType = {
    freetime: FreeTimeType[];
    page: number;
    totalPages: number;
    totalRecords: number;
};
