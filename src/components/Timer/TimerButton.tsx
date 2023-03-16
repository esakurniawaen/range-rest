import { useEffect, useState } from 'react';
import { useUpdateEffect, useHarmonicIntervalFn } from 'react-use';
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
    onTimerIntervalChange: (interval: NodeJS.Timeout | null) => void;
    onTimerTimeoutChange: (timeout: NodeJS.Timeout | null) => void;
};

const TICK_INTERVAL = 10;

export default function TimerButton({
    timer,
    onTimerStatusChange,
    onTimerIntervalChange,
    onTimerTimeLeftChange,
    onTimerTimeoutChange,
}: TimerButtonProps) {
    const [timeLeft, setTimeLeft] = useState(timer.timeLeft);

    const [isTimerIntervalActive, setisTimerIntervalActive] = useState();

    useHarmonicIntervalFn(() => {
        tick()
    }, isTimerIntervalActive)

    useUpdateEffect(() => {
        if (timeLeft === 0 && timer.status === 'active') {
            startBreak();
        }

        onTimerTimeLeftChange(timeLeft);
        console.log(timer.timeLeft);
    }, [timeLeft]);

    function tick() {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
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
        setTimeLeft(randomCountdownTimeInSeconds);
        const interval = setInterval(tick, TICK_INTERVAL);
        onTimerIntervalChange(interval);
        onTimerStatusChange('active');

        // for development only
        console.log('timer is started');
    }

    function cancelTimer() {
        if (timer.status === 'active') {
            if (timer.interval) {
                clearInterval(timer.interval);
            }

            setTimeLeft(0);
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
        if (timer.interval) {
            clearInterval(timer.interval);
        }

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
