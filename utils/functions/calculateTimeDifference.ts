export function calculateTimeDifference(from: string, to: string): number {
    const [fromHours, fromMinutes] = from.split(':').map(Number);
    const [toHours, toMinutes] = to.split(':').map(Number);

    const fromTimeInMinutes = fromHours * 60 + fromMinutes;
    const toTimeInMinutes = toHours * 60 + toMinutes;

    // Tính toán sự chênh lệch về phút và đổi lại thành giờ
    const differenceInMinutes = toTimeInMinutes - fromTimeInMinutes;
    const differenceInHours = differenceInMinutes / 60;

    return differenceInHours;
}
