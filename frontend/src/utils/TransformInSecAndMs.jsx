export function TransformInSecAndMs(delay) {
    const seconds = Math.trunc(delay / 1000);
    const milliseconds = delay % 1000;

    let transformDelay = seconds + 's' + ' ' + milliseconds + 'ms';

    return transformDelay;
}

export default { TransformInSecAndMs };