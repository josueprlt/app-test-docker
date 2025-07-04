export function TransformInSecAndMs(delay) {
    const seconds = Math.trunc(delay / 1000);
    const milliseconds = delay % 1000;
    let transformDelay;

    if (seconds <= 0) {
        transformDelay = milliseconds + 'ms';
    } else {
        transformDelay = seconds + 's' + ' ' + milliseconds + 'ms';
    }

    return transformDelay;
}