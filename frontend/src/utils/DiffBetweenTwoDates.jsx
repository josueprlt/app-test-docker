export function DiffBetweenTwoDates(dateLog) {
    const now = new Date();
    const logDate = new Date(dateLog);
    const diffInMs = now.getTime() - logDate.getTime();

    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    let date2 = '';
    if (diffInYears > 0) {
        date2 = `Il y a ${diffInYears} an${diffInYears === 0 || diffInYears === 1 ? '' : 's'}`;
    } else if (diffInWeeks > 0) {
        date2 = `Il y a ${diffInWeeks} semaine${diffInWeeks === 0 || diffInWeeks === 1 ? '' : 's'}`;
    } else if (diffInDays > 0) {
        date2 = `Il y a ${diffInDays} jour${diffInDays === 0 || diffInDays === 1 ? '' : 's'}`;
    } else if (diffInHours > 0) {
        date2 = `Il y a ${diffInHours} heure${diffInHours === 0 || diffInHours === 1 ? '' : 's'}`;
    } else {
        date2 = `Il y a ${diffInMinutes} minute${diffInMinutes === 0 || diffInMinutes === 1 ? '' : 's'}`;
    }

    return date2;
}

export default { DiffBetweenTwoDates };