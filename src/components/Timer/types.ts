export type TimerStatus = 'inactive' | 'active' | 'break';

export type TimerTime = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type Timer = {
    timeLeft: number;
    interval: NodeJS.Timeout | null;
    timeout: NodeJS.Timeout | null;
    status: TimerStatus;
    minCountdownTime: TimerTime;
    maxCountdownTime: TimerTime;
    breakDuration: TimerTime;
};
