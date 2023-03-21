export function convertTimeToSeconds(
    hours: number,
    minutes: number,
    seconds: number,
) {
    return hours * 3600 + minutes * 60 + seconds;
}

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
