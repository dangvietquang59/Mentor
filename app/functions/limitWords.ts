export function limitWord(input: string, limit: number): string {
    if (!input || limit <= 0) {
        return '';
    }

    const words = input.split(' ');

    if (words.length <= limit) {
        return input;
    }

    const limitedWords = words.slice(0, limit).join(' ');
    return `${limitedWords}...`;
}