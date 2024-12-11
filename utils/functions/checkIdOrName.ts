export const isValidId = (value: string): boolean => {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(value);
};

export const checkIdOrName = (value: string) => {
    if (isValidId(value)) {
        return { type: 'id', value };
    } else {
        return { type: 'name', value };
    }
};
