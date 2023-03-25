import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Duration } from '~/types';

const DEFAULT_TASK_PREFERENCE = {
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

const DEFAULT_BREAK_PREFERENCE = {
    breakDuration: {
        hours: 0,
        minutes: 0,
        seconds: 10,
    },
    endSound: 'attention-bell-ding',
    endSounds: ['attention-bell-ding'],
};

export type TaskPreference = {
    minTaskDuration: Duration;
    maxTaskDuration: Duration;
    endSound: string;
    endSounds: string[];
};

export type BreakPreference = {
    breakDuration: Duration;
    endSound: string;
    endSounds: string[];
};

type TimerPreferenceState = {
    taskPreference: TaskPreference;
    breakPreference: BreakPreference;
};

type TimerPreferenceAction = {
    setTaskPreference: <K extends keyof TaskPreference>(
        key: K,
        value: TaskPreference[K],
    ) => void;
    setBreakPreference: <K extends keyof BreakPreference>(
        key: K,
        value: BreakPreference[K],
    ) => void;
    resetTaskPreference: () => void;
    resetBreakPreference: () => void;
};

const useTimerPreferenceStore = create(
    persist<TimerPreferenceState & TimerPreferenceAction>(
        (set) => ({
            taskPreference: DEFAULT_TASK_PREFERENCE,
            breakPreference: DEFAULT_BREAK_PREFERENCE,
            setTaskPreference: (key, value) => {
                set((state) => ({
                    taskPreference: {
                        ...state.taskPreference,
                        [key]: value,
                    },
                }));
            },
            setBreakPreference: (key, value) => {
                set((state) => ({
                    breakPreference: {
                        ...state.breakPreference,
                        [key]: value,
                    },
                }));
            },
            resetTaskPreference: () =>
                set((state) => ({
                    ...state,
                    taskPreference: DEFAULT_TASK_PREFERENCE,
                })),
            resetBreakPreference: () =>
                set((state) => ({
                    ...state,
                    breakPreference: DEFAULT_BREAK_PREFERENCE,
                })),
        }),
        {
            name: 'timer-preference-storage',
        },
    ),
);

export default useTimerPreferenceStore;
