export function convertTimeToSeconds(
    hours: number,
    minutes: number,
    seconds: number,
) {
    return hours * 3600 + minutes * 60 + seconds;
}

export function convertTimeToMilliseconds(
    hours: number,
    minutes: number,
    seconds: number,
) {
    return (hours * 3600 + minutes * 60 + seconds) * 1000
}

export function generateRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
