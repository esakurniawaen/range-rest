import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Duration } from '~/types';

const DEFAULT_TASK_TIMER_PREFERENCE = {
    minTaskDuration: {
        hours: 0,
        minutes: 1,
        seconds: 0,
    },
    maxTaskDuration: {
        hours: 0,
        minutes: 3,
        seconds: 0,
    },
    endSound: 'relaxing-bell-chime',
    endSounds: ['relaxing-bell-chime'],
};

const DEFAULT_BREAK_TIMER_PREFERENCE = {
    breakDuration: {
        hours: 0,
        minutes: 0,
        seconds: 10,
    },
    endSound: 'attention-bell-ding',
    endSounds: ['attention-bell-ding'],
};

export type TaskTimerPreference = {
    minTaskDuration: Duration;
    maxTaskDuration: Duration;
    endSound: string;
    endSounds: string[];
};

export type BreakTimerPreference = {
    breakDuration: Duration;
    endSound: string;
    endSounds: string[];
};

type TimerPreferenceState = {
    taskTimerPreference: TaskTimerPreference;
    breakTimerPreference: BreakTimerPreference;
};

type TimerPreferenceAction = {
    setTaskTimerPreference: <K extends keyof TaskTimerPreference>(
        key: K,
        value: TaskTimerPreference[K],
    ) => void;
    setBreakTimerPreference: <K extends keyof BreakTimerPreference>(
        key: K,
        value: BreakTimerPreference[K],
    ) => void;
    resetTaskTimerPreference: () => void;
    resetBreakTimerPreference: () => void;
};

const useTimerPreferenceStore = create(
    persist<TimerPreferenceState & TimerPreferenceAction>(
        (set) => ({
            taskTimerPreference: DEFAULT_TASK_TIMER_PREFERENCE,
            breakTimerPreference: DEFAULT_BREAK_TIMER_PREFERENCE,
            setTaskTimerPreference: (key, value) => {
                set((state) => ({
                    taskTimerPreference: {
                        ...state.taskTimerPreference,
                        [key]: value,
                    },
                }));
            },
            setBreakTimerPreference: (key, value) => {
                set((state) => ({
                    breakTimerPreference: {
                        ...state.breakTimerPreference,
                        [key]: value,
                    },
                }));
            },
            resetTaskTimerPreference: () =>
                set((state) => ({
                    ...state,
                    taskTimerPreference: DEFAULT_TASK_TIMER_PREFERENCE,
                })),
            resetBreakTimerPreference: () =>
                set((state) => ({
                    ...state,
                    breakTimerPreference: DEFAULT_BREAK_TIMER_PREFERENCE,
                })),
        }),
        {
            name: 'timer-preference-storage',
        },
    ),
);

export default useTimerPreferenceStore;
