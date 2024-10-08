export function getFirstImageFromHTML(content: string): string | null {
    const regex = /<img[^>]+src="([^">]+)"/i;
    const match = content.match(regex);

    return match ? match[1] : null;
}
