import { useState } from 'react';
import { useInterval, useTimeout } from 'usehooks-ts';
import {
    convertTimeToMilliseconds,
    convertTimeToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import type { TimerPreferences, TimerStatus } from './types';

const TICK_INTERVAL = 20;

export default function useTimer(timerPreferences: TimerPreferences) {
    const { breakDuration, minCountdownTime, maxCountdownTime } =
        timerPreferences;
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('inactive');
    const [activeTimerTimeLeft, setActiveTimerTimeLeft] = useState<
        number | null
    >(null);
    const [breakTimerTimeLeft, setTimerBreakTimeLeft] = useState<number | null>(
        null,
    );

    const breakDurationInMs = convertTimeToMilliseconds(
        breakDuration.hours,
        breakDuration.minutes,
        breakDuration.seconds,
    );

    useTimeout(startTimer, timerStatus === 'break' ? breakDurationInMs : null);
    useInterval(activeTimerTick, timerStatus === 'active' ? TICK_INTERVAL : null);

    function activeTimerTick() {
        if (activeTimerTimeLeft === null) return;

        const currentTimeLeft = activeTimerTimeLeft - 1;
        if (currentTimeLeft === 0 || activeTimerTimeLeft === 0) {
            startBreak();
            setActiveTimerTimeLeft(0);
            console.log(0);
            return;
        }

        setActiveTimerTimeLeft(currentTimeLeft);
        console.log(currentTimeLeft);
    }

    function startTimer() {
        playSound('timerStarts');
        setTimerStatus('active');

        const randomCountdownTimeInSeconds = getRandomTimerTimeInSeconds();
        setActiveTimerTimeLeft(randomCountdownTimeInSeconds);
    }

    function cancelTimer() {
        setActiveTimerTimeLeft(null);
        setTimerStatus('inactive');
    }

    function startBreak() {
        playSound('breakStarts');
        setTimerStatus('break');
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

    return { startTimer, cancelTimer, timerStatus, activeTimerTimeLeft };
}
