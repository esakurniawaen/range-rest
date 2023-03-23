import { create } from 'zustand';
import type { TaskTimerPreference, BreakTimerPreference } from '~/types';

const DEFAULT_TASK_TIMER_PREFERENCE = {
    minTaskDuration: {
        hours: 0,
        minutes: 0,
        seconds: 10,
    },
    maxTaskDuration: {
        hours: 0,
        minutes: 3,
        seconds: 0,
    },
    startSound: 'attention-bell-ding',
    startSounds: ['attention-bell-ding'],
};

const DEFAULT_BREAK_TIMER_PREFERENCE = {
    breakDuration: {
        hours: 0,
        minutes: 0,
        seconds: 10,
    },
    startSound: 'relaxing-bell-chime',
    startSounds: ['relaxing-bell-chime'],
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

const useTimerPreferenceStore = create<
    TimerPreferenceState & TimerPreferenceAction
>((set) => ({
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
}));

export default useTimerPreferenceStore;
