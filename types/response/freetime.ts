export type FreeTimeType = {
    userId: string;
    freeDate: Date;
    startTime: string;
    endTime: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};
export type FreeTimeReponseType = {
    freetime: FreeTimeType[];
    page: number;
    totalPages: number;
    totalRecords: number;
};
