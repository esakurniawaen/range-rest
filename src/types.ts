export type ResolvedTheme = 'light' | 'dark';
export type Theme = 'system' | ResolvedTheme;

export type TimerStatus =
    | 'idle'
    | 'taskActive'
    | 'taskEnd'
    | 'breakActive'
    | 'breakEnd';

export type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
};

