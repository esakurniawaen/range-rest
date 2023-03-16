import { useEffect, useState } from 'react';
import { useUpdateEffect, useHarmonicIntervalFn, useTimeout } from 'react-use';
import { TypeOf } from 'zod';
import {
    convertTimeToMilliseconds,
    convertTimeToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import { Button } from '../buttons';
import type { Timer, TimerStatus } from './types';

type TimerButtonProps = {
    timer: Timer;
    onTimerStatusChange: (timerStatus: TimerStatus) => void;
    onTimerTimeLeftChange: (timeLeft: number) => void;
    onTimerTimeoutChange: (timeout: NodeJS.Timeout | null) => void;
};

const TICK_INTERVAL = 10;

export default function TimerButton({
    timer,
    onTimerStatusChange,
    onTimerTimeLeftChange,
    onTimerTimeoutChange,
}: TimerButtonProps) {
    const [timerInterval, setTimerInterval] = useState<typeof TICK_INTERVAL | null>(null);
const [isTimerTimeoutReady, cancelTimerTimeout] = useTimeout(null)

    useHarmonicIntervalFn(tick, timerInterval);
    

    function tick() {
        const currentTimeLeft = timer.timeLeft - 1;

        if (currentTimeLeft === 0 && timer.status === 'active') {
            startBreak();
        }

        console.log(currentTimeLeft);
        onTimerTimeLeftChange(currentTimeLeft);
    }

    function startTimer() {
        const { minCountdownTime, maxCountdownTime } = timer;
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

        const randomCountdownTimeInSeconds = generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxCountdownTimeInSeconds,
        );

        playSound('timerStarts');
        onTimerTimeLeftChange(randomCountdownTimeInSeconds);
        setTimerInterval(TICK_INTERVAL);
        onTimerStatusChange('active');

        // for development only
        console.log('timer is started');
    }

    function cancelTimer() {
        if (timer.status === 'active') {
            setTimerInterval(null);
            onTimerTimeLeftChange(0);
        }

        if (timer.status === 'break') {
            if (timer.timeout) {
                clearTimeout(timer.timeout);
            }
        }

        onTimerStatusChange('inactive');
        console.log('timer is canceled');
    }

    function playSound(soundType: 'timerStarts' | 'breakStarts') {
        if (soundType === 'timerStarts') {
            console.log('start');
        }

        console.log('stop');
    }

    function startBreak() {
        setTimerInterval(null);

        playSound('breakStarts');
        onTimerStatusChange('break');

        const { breakDuration } = timer;
        const breakDurationInMilliseconds = convertTimeToMilliseconds(
            breakDuration.hours,
            breakDuration.minutes,
            breakDuration.seconds,
        );
        const timeout = setTimeout(() => {
            startTimer();
        }, breakDurationInMilliseconds);
        onTimerTimeoutChange(timeout);
    }

    return (
        <Button
            onClick={() =>
                timer.status === 'inactive' ? startTimer() : cancelTimer()
            }
            variant={timer.status === 'inactive' ? 'primary' : 'secondary'}
        >
            {timer.status === 'inactive' ? 'Start' : 'Cancel'}
        </Button>
    );
}
