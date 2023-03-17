export type TimerStatus = 'inactive' | 'active' | 'break';

export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type TimerPreferences = {
    minCountdownTime: Time;
    maxCountdownTime: Time;
    breakDuration: Time;
};


