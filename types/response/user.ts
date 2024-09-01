type Technologies = {
    technology: {
        _id: string;
        name: string;
    };
    experienceYears: number;
    _id?: string;
};
export type UserTypeRespone = {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    imageUrl: string;
    bio: string;
    slug: string;
    rating: string;
    createdAt: Date;
    updatedAt: Date;
    technologies: Technologies[];
};
