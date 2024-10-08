export type TechnologiesType = {
    name: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TechnologiesResponseType = {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    technologies: TechnologiesType[];
};
