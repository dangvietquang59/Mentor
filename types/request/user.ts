type Technologies = {
    technology: string;
    experienceYears: number;
    _id?: string;
};
export type UserTypeRequest = {
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
    pricePerHour: number;
    coin: number;
};
