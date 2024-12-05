interface FormattedDate {
    dayOfWeek: string;
    day: number;
    month: string;
    year: string;
}

export const getFormattedDate = (date: Date): FormattedDate => {
    const daysOfWeek = [
        'CN',
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ5',
        'Thứ 6',
        'Thứ 7',
    ];
    const monthsOfYear = [
        'Th1',
        'Th2',
        'Th3',
        'Th4',
        'Th5',
        'Th6',
        'Th7',
        'Th8',
        'Th9',
        'Th10',
        'Th11',
        'Th12',
    ];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2); // Lấy 2 chữ số cuối của năm

    return {
        dayOfWeek,
        day,
        month,
        year,
    };
};
