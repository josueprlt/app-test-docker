export function DiffBetweenTwoDates(txt, dateLog) {
    const now = new Date();
    const logDate = new Date(dateLog);
    let diffInMs = now.getTime() - logDate.getTime();

    // const isFuture = diffInMs < 0;
    diffInMs = Math.abs(diffInMs);

    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    let date2;

    if (diffInYears > 0) {
        date2 = `${txt} ${diffInYears} an${diffInYears === 1 ? '' : 's'}`;
    } else if (diffInWeeks > 0) {
        date2 = `${txt} ${diffInWeeks} semaine${diffInWeeks === 1 ? '' : 's'}`;
    } else if (diffInDays > 0) {
        date2 = `${txt} ${diffInDays} jour${diffInDays === 1 ? '' : 's'}`;
    } else if (diffInHours > 0) {
        date2 = `${txt} ${diffInHours} heure${diffInHours === 1 ? '' : 's'}`;
    } else {
        date2 = `${txt} ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`;
    }

    return date2;
}