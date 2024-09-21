export function formatTime(isoString: string): string {
    const date = new Date(isoString);

    const vietnamHours = date.getUTCHours() + 7;
    const hours = vietnamHours >= 24 ? vietnamHours - 24 : vietnamHours;
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}
