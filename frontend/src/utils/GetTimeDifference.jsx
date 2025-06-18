export function GetTimeDifference(date1Str, date2Str) {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);

    const diffMs = Math.abs(date2 - date1);
    const seconds = Math.floor(diffMs / 1000);
    const milliseconds = diffMs % 1000;

    let conversionTime;

    if (seconds !== 0) {
        conversionTime = (seconds * 1000) + milliseconds;
    } else {
        conversionTime = milliseconds;
    }

    return conversionTime;
}