export function convertDurationToSeconds(
    hours: number,
    minutes: number,
    seconds: number,
) {
    return hours * 3600 + minutes * 60 + seconds;
}

export function capitalizeFirstWord(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function convertRegularNumberToOrdinal(num: number) {
    const suffixes = ['th', 'st', 'nd', 'rd'] as const;
    const lastDigit: number = num % 10;
    const secondLastDigit: number = Math.floor(num / 10) % 10;
    const suffix =
        secondLastDigit === 1
            ? suffixes[0]
            : suffixes[lastDigit] || suffixes[0];

    return `${num}${suffix}`;
}
