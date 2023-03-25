export type ResolvedTheme = 'light' | 'dark';
export type Theme = 'system' | ResolvedTheme;

export type TimerStatus =
    | 'idle'
    | 'sessionActive'
    | 'sessionEnd'
    | 'breakActive'
    | 'breakEnd';

export type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
};
