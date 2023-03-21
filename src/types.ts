export type ResolvedTheme = 'light' | 'dark';
export type Theme = 'system' | ResolvedTheme;

export type TimerStatus = 'inactive' | 'task' | 'break';

export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type TaskTimerPreference = {
    minTaskDuration: Time;
    maxTaskDuration: Time;
    startSound: string;
    startSounds: string[];
};

export type BreakTimerPreference = {
    breakDuration: Time;
    startSound: string;
    startSounds: string[];
};
