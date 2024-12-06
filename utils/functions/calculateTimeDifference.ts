export function calculateTimeDifference(from: string, to: string): number {
    // Kiểm tra xem chuỗi thời gian có phải là dạng hợp lệ không
    const fromParts = from.split(':');
    console.log('🚀 ~ calculateTimeDifference ~ fromParts:', fromParts);
    const toParts = to.split(':');
    console.log('🚀 ~ calculateTimeDifference ~ toParts:', toParts);

    if (fromParts.length !== 2 || toParts.length !== 2) {
        throw new Error('Invalid time format');
    }

    const [fromHours, fromMinutes] = fromParts.map(Number);
    console.log('🚀 ~ calculateTimeDifference ~ fromMinutes:', fromMinutes);
    console.log('🚀 ~ calculateTimeDifference ~ fromHours:', fromHours);
    const [toHours, toMinutes] = toParts.map(Number);
    console.log('🚀 ~ calculateTimeDifference ~ toMinutes:', toMinutes);
    console.log('🚀 ~ calculateTimeDifference ~ toHours:', toHours);

    if (
        isNaN(fromHours) ||
        isNaN(fromMinutes) ||
        isNaN(toHours) ||
        isNaN(toMinutes)
    ) {
        throw new Error('Invalid time values');
    }

    const fromTimeInMinutes = fromHours * 60 + fromMinutes;
    const toTimeInMinutes = toHours * 60 + toMinutes;

    const differenceInMinutes = toTimeInMinutes - fromTimeInMinutes;
    const differenceInHours = differenceInMinutes / 60;

    return differenceInHours;
}
