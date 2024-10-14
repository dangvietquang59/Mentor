export function formatTimeString(timeString: string): string {
    const time = new Date(timeString);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
    } else if (minutes < 60) {
        return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
    } else if (hours < 24) {
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} hours ago`;
    } else if (days < 30) {
        return `${days} ${days > 1 ? 'days' : 'day'} days ago`;
    } else if (months < 12) {
        return `${months} ${months > 1 ? 'months' : 'month'} months ago`;
    } else {
        return `${years} ${years > 1 ? 'years' : 'years'} years ago`;
    }
}
