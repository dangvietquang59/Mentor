export type LoginResponseType = {
    message: string;
    data: {
        _id: string;
        email: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    };
    accessToken: string;
    refreshToken: string;
};
