export type JobTitleType = {
    _id: string;
    name: string;
};

export type JobtitleResponeType = {
    totalJobs: number;
    totalPages: number;
    currentPage: number;
    jobs: JobTitleType[];
};
