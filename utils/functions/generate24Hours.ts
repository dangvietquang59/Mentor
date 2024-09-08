export function generate24Hours(): string[] {
    const hours: string[] = [];
    for (let i = 0; i < 24; i++) {
        // Nếu giờ là một chữ số, thêm số 0 ở phía trước
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        hours.push(hour);
    }
    return hours;
}
