export function formatDate(
    dateString: string,
    format: 'DD/MM/YYYY' | 'YYYY-MM-DD' = 'DD/MM/YYYY',
): string {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Extract the day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();

    // Format the date according to the specified format
    if (format === 'DD/MM/YYYY') {
        return `${day}/${month}/${year}`;
    } else {
        // 'YYYY-MM-DD'
        return `${year}-${month}-${day}`;
    }
}
