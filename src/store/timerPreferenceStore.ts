import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const DEFAULT_SESSION_PREFERENCE = {
    minSessionDuration: {
        hours: 0,
        minutes: 1,
        seconds: 0,
    },
    maxSessionDuration: {
        hours: 0,
        minutes: 3,
        seconds: 0,
    },
    endSound: 'relaxing-bell-chime',
    endSounds: ['relaxing-bell-chime'],
};

export const DEFAULT_BREAK_PREFERENCE = {
    breakDuration: {
        hours: 0,
        minutes: 0,
        seconds: 10,
    },
    endSound: 'attention-bell-ding',
    endSounds: ['attention-bell-ding'],
};

export type Duration = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type SessionPreference = {
    minSessionDuration: Duration;
    maxSessionDuration: Duration;
    endSound: string;
    endSounds: string[];
};

export type BreakPreference = {
    breakDuration: Duration;
    endSound: string;
    endSounds: string[];
};

type TimerPreferenceState = {
    sessionPreference: SessionPreference;
    breakPreference: BreakPreference;
};

type TimerPreferenceAction = {
    setSessionPreference: <K extends keyof SessionPreference>(
        key: K,
        value: SessionPreference[K],
    ) => void;
    setBreakPreference: <K extends keyof BreakPreference>(
        key: K,
        value: BreakPreference[K],
    ) => void;
    resetSessionPreference: () => void;
    resetBreakPreference: () => void;
};

const useTimerPreferenceStore = create(
    persist<TimerPreferenceState & TimerPreferenceAction>(
        (set) => ({
            sessionPreference: DEFAULT_SESSION_PREFERENCE,
            breakPreference: DEFAULT_BREAK_PREFERENCE,
            setSessionPreference: (key, value) => {
                set((state) => ({
                    sessionPreference: {
                        ...state.sessionPreference,
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
            resetSessionPreference: () =>
                set((state) => ({
                    ...state,
                    sessionPreference: DEFAULT_SESSION_PREFERENCE,
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
