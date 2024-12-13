import { TagType } from '@/types/response/blog';

export type TagsResponseType = {
    totalTags: number;
    totalPages: number;
    currentPage: number;
    tags: TagType[];
};
