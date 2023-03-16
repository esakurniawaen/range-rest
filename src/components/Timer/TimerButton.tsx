import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import {
    convertHoursToSeconds,
    convertMinutesToSeconds,
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
        const minCountdownTimeInSeconds =
            convertHoursToSeconds(minCountdownTime.hours) +
            convertMinutesToSeconds(minCountdownTime.minutes) +
            minCountdownTime.seconds;
        const maxCountdownTimeInSeconds =
            convertHoursToSeconds(maxCountdownTime.hours) +
            convertMinutesToSeconds(maxCountdownTime.minutes) +
            maxCountdownTime.seconds;

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

        const breakDurationInSeconds = convertTimeToSeconds()
            convertHoursToSeconds(breakDuration.hours) +
            convertMinutesToSeconds(breakDuration.minutes) +
            breakDuration.seconds;
        console.log(breakDurationInSeconds)
        const timeout = setTimeout(() => {
            startTimer();
        }, 5000);
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
