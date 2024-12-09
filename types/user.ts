type Technologies = {
    technology: {
        _id: string;
        name: string;
    };
    experienceYears: number;
    _id?: string;
};
type Bio = {
    _id: string;
    name: string;
};
export type UserType = {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    imageUrl: string;
    bio: Bio;
    slug: string;
    rating: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    technologies: Technologies[];
    coin: number;
    pricePerHour: number;
};
