export type ResolvedTheme = 'light' | 'dark';
export type Theme = 'system' | ResolvedTheme;

export type TimerStatus = 'inactive' | 'task' | 'break';

export type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type TaskTimerPreference = {
    minTaskDuration: Duration;
    maxTaskDuration: Duration;
    startSound: string;
    startSounds: string[];
};

export type BreakTimerPreference = {
    breakDuration: Duration;
    startSound: string;
    startSounds: string[];
};
