export function generateHours(startTime: string, endTime: string): string[] {
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);

    if (startHour > endHour) {
        throw new Error('Start time must be less than or equal to end time');
    }

    const hoursArray = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        if (hour < 10) hoursArray.push(`0${hour}:00`);
        else {
            hoursArray.push(`${hour}:00`);
        }
    }

    return hoursArray;
}
