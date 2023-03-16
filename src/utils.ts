export function convertHoursToSeconds(hours: number) {
    return hours * 3600;
}

export function convertMinutesToSeconds(minutes: number) {
    return minutes * 60;
}

export function generateRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}