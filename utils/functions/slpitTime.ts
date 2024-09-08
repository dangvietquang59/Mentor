export function removeLeadingZeros(str: string) {
    if (str.length === 2 && str.startsWith('0')) {
        return str[1];
    }
    return str;
}
