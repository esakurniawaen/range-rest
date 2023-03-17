import { useState } from 'react';
import { useEffectOnce, useHarmonicIntervalFn, useTimeoutFn } from 'react-use';
import {
    convertTimeToMilliseconds,
    convertTimeToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import type { TimerStatus, TimerPreferences } from './types';

const TICK_INTERVAL = 20;

export default function useTimer(timerPreferences: TimerPreferences) {
    const { breakDuration, minCountdownTime, maxCountdownTime } = timerPreferences;
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('inactive');
    const [timerTimeLeft, setTimerTimeLeft] = useState<number | null>(null);

    const [, cancel, reset] = useTimeoutFn(
        startTimer,
        convertTimeToMilliseconds(
            breakDuration.hours,
            breakDuration.minutes,
            breakDuration.seconds,
        ),
    );
    useEffectOnce(() => {
        cancel();
    });
    useHarmonicIntervalFn(
        tick,
        timerStatus === 'active' ? TICK_INTERVAL : null,
    );

    function tick() {
        if (timerTimeLeft === null) return;

        const currentTimeLeft = timerTimeLeft - 1;
        if (currentTimeLeft === 0) {
            startBreak();
        }
        setTimerTimeLeft(currentTimeLeft);
        console.log(currentTimeLeft);
    }

    function startTimer() {
        playSound('timerStarts');
        setTimerStatus('active');

        const randomCountdownTimeInSeconds = getRandomTimerTimeInSeconds();
        setTimerTimeLeft(randomCountdownTimeInSeconds);
    }

    function cancelTimer() {
        setTimerTimeLeft(null);
        setTimerStatus('inactive');
        // for canceling the break duration if it is active
        cancel()
    }

    function startBreak() {
        playSound('breakStarts');
        setTimerStatus('break');
        // to start the break duration
        reset();
    }

    function getRandomTimerTimeInSeconds() {
        const minCountdownTimeInSeconds = convertTimeToSeconds(
            minCountdownTime.hours,
            minCountdownTime.minutes,
            minCountdownTime.seconds,
        );
        const maxCountdownTimeInSeconds = convertTimeToSeconds(
            maxCountdownTime.hours,
            maxCountdownTime.minutes,
            maxCountdownTime.seconds,
        );

        if (minCountdownTimeInSeconds > maxCountdownTimeInSeconds) {
            throw new Error(
                'Minimum countdown-time must be less than maximum countdown-time.',
            );
        }

        return generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxCountdownTimeInSeconds,
        );
    }

    function playSound(soundType: 'timerStarts' | 'breakStarts') {
        const money = 'kdfjdkfj';
    }

    return { startTimer, cancelTimer, timerStatus, timerTimeLeft };
}
