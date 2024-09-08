interface FormattedDate {
    dayOfWeek: string;
    day: number;
    month: string;
    year: string;
}

export const getFormattedDate = (date: Date): FormattedDate => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthsOfYear = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);

    return {
        dayOfWeek,
        day,
        month,
        year,
    };
};
