export type LoginRequestType = {
    email: string;
    password: string;
};

export type RegisterRequestType = {
    role: string;
    email: string;
    password: string;
    confirmPassword: string;
};
