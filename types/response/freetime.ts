export type FreeTimeType = {
    userId: string;
    freeDate: Date;
    startTime: string;
    endTime: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};
export type FreeTimeResponseType = {
    freetime: FreeTimeType[];
    page: number;
    totalPages: number;
    totalRecords: number;
};
