import { act, renderHook } from '@testing-library/react';
import {
    DEFAULT_BREAK_PREFERENCE,
    DEFAULT_SESSION_PREFERENCE,
} from '~/store/timerPreferenceStore';
import useTimer from '../useTimer';

describe('useTimer', () => {
    it('should start the timer at a random duration in seconds', () => {
        const { result } = renderHook(() =>
            useTimer(DEFAULT_SESSION_PREFERENCE, DEFAULT_BREAK_PREFERENCE),
        );

        act(() => result.current.startTimer());
        const previousSessionTimeLeft = result.current.sessionTimeLeft;
        act(() => result.current.startTimer());

        expect(result.current.sessionTimeLeft).not.toBe(
            previousSessionTimeLeft,
        );
        expect(typeof result.current.sessionTimeLeft).toBe('number');
    });

    it('should change the timerStatus to sessionActive when the timer started', () => {
        const { result } = renderHook(() =>
            useTimer(DEFAULT_SESSION_PREFERENCE, DEFAULT_BREAK_PREFERENCE),
        );

        act(() => result.current.startTimer());
        expect(result.current.timerStatus).toBe('sessionActive');
    });

    it('should be in the initial values when the timer first loaded', () => {
        const { result } = renderHook(() =>
            useTimer(DEFAULT_SESSION_PREFERENCE, DEFAULT_BREAK_PREFERENCE),
        );
        expect(result.current.timerStatus).toBe('idle');
        expect(result.current.sessionTimeLeft).toBe(null);
        expect(result.current.breakTimeLeft).toBe(null);
        expect(result.current.sessionCount).toBe(0);
        expect(result.current.breakCount).toBe(0);
    });

    it('should reset all timer values to its initial value when the timer is canceled', () => {
        const { result } = renderHook(() =>
            useTimer(DEFAULT_SESSION_PREFERENCE, DEFAULT_BREAK_PREFERENCE),
        );
        act(() => result.current.cancelTimer());
        expect(result.current.timerStatus).toBe('idle');
        expect(result.current.sessionTimeLeft).toBe(null);
        expect(result.current.breakTimeLeft).toBe(null);
        expect(result.current.sessionCount).toBe(0);
        expect(result.current.breakCount).toBe(0);
    });
});
