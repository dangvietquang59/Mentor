export function parseNumber(input: string): number {
    const cleanedInput = input.replace(/\./g, '');

    return parseInt(cleanedInput, 10);
}
