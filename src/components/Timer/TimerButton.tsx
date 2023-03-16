import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import {
    convertTimeToMilliseconds,
    convertTimeToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import { Button } from '../buttons';
import type { TimerStatus, TimerTime } from './types';

type TimerButtonProps = {
    timerStatus: TimerStatus;
    onTimerStatusChange: (timerStatus: TimerStatus) => void;
    minCountdownTime: TimerTime;
    maxCountdownTime: TimerTime;
    breakDuration: TimerTime;
};

const TICK_INTERVAL = 10;

export default function TimerButton({
    timerStatus,
    onTimerStatusChange,
    minCountdownTime,
    maxCountdownTime,
    breakDuration,
}: TimerButtonProps) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
        null,
    );
    const [breakTimeout, setBreakTimeout] = useState<NodeJS.Timeout | null>(
        null,
    );

    useUpdateEffect(() => {
        if (timeLeft === 0 && timerStatus === 'active') {
            startBreak();
        }

        console.log(timeLeft);
    }, [timeLeft]);

    function tick() {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }

    function startTimer() {
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

        console.log('min countdown time', minCountdownTimeInSeconds)

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
        setTimerInterval(interval);
        onTimerStatusChange('active');

        // for development only
        console.log('timer is started');
    }

    function cancelTimer() {
        if (timerStatus === 'active') {
            if (timerInterval) {
                clearInterval(timerInterval);
            }

            setTimeLeft(0);
        }

        if (timerStatus === 'break') {
            if (breakTimeout) {
                clearTimeout(breakTimeout);
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
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        playSound('breakStarts');
        onTimerStatusChange('break');

        const breakDurationInMilliseconds = convertTimeToMilliseconds(
            breakDuration.hours,
            breakDuration.minutes,
            breakDuration.seconds,
        );
        const timeout = setTimeout(() => {
            startTimer();
        }, breakDurationInMilliseconds);
        setBreakTimeout(timeout);
    }

    return (
        <Button
            onClick={() =>
                timerStatus === 'inactive' ? startTimer() : cancelTimer()
            }
            variant={timerStatus === 'inactive' ? 'primary' : 'secondary'}
        >
            {timerStatus === 'inactive' ? 'Start' : 'Cancel'}
        </Button>
    );
}
