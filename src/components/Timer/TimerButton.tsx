import { useEffectOnce, useHarmonicIntervalFn, useTimeoutFn } from 'react-use';
import {
    convertTimeToMilliseconds,
    convertTimeToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import { Button } from '../buttons';
import type { TimerStatus, TimerPreferences } from './types';
import { useTimeout } from 'usehooks-ts';

type TimerButtonProps = {
    timerPreferences: TimerPreferences;
    timerStatus: TimerStatus;
    timerTimeLeft: number;
    onTimerStatusChange: (timerStatus: TimerStatus) => void;
    onTimerTimeLeftChange: (timeLeft: number) => void;
};

const TICK_INTERVAL = 10;

export default function TimerButton({
    timerPreferences,
    timerStatus,
    timerTimeLeft,
    onTimerStatusChange,
    onTimerTimeLeftChange,
}: TimerButtonProps) {
    const { breakDuration, minCountdownTime, maxCountdownTime } =
        timerPreferences;

    // use the useTimeout from usehooks-ts
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
        const currentTimeLeft = timerTimeLeft - 1;
        if (currentTimeLeft === 0 && timerStatus === 'active') {
            startBreak();
        }
        onTimerTimeLeftChange(currentTimeLeft);
        console.log(currentTimeLeft);
    }

    function startTimer() {
        playSound('timerStarts');
        onTimerStatusChange('active');

        const randomCountdownTimeInSeconds = getRandomTimerTimeInSeconds();
        onTimerTimeLeftChange(randomCountdownTimeInSeconds);
    }

    function cancelTimer() {
        onTimerTimeLeftChange(0);
        onTimerStatusChange('inactive');
        // for canceling the break duration if it is active
        cancel();
    }

    function startBreak() {
        playSound('breakStarts');
        onTimerStatusChange('break');
        // for starting break duration
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
