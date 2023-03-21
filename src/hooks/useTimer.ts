import { useState } from 'react';
import { useInterval, useUpdateEffect } from 'usehooks-ts';
import { convertTimeToSeconds, generateRandomNumberInRange } from '~/utils';
import useTimerPreferenceStore from '../store/timerPreferenceStore';
import type { TimerStatus } from '../types';
import useAudio from './useAudio';

const TICK_INTERVAL = 1000;

export default function useTimer() {
    const { taskTimerPreference, breakTimerPreference } =
        useTimerPreferenceStore();

    const [timerStatus, setTimerStatus] = useState<TimerStatus>('inactive');
    const [taskTimeLeft, setTaskTimeLeft] = useState<number | null>(null);
    const [breakTimeLeft, setBreakTimeLeft] = useState<number | null>(null);

    useInterval(breakTimerTick, timerStatus === 'break' ? TICK_INTERVAL : null);
    useInterval(taskTimerTick, timerStatus === 'task' ? TICK_INTERVAL : null);

    const taskStartAudio = useAudio(
        `/audios/taskStart/${taskTimerPreference.startSound}.wav`,
    );
    const breakStartAudio = useAudio(
        `/audios/breakStart/${breakTimerPreference.startSound}.wav`,
    );

    useUpdateEffect(() => {
        if (taskTimeLeft === 0) {
            startBreakTimer();
        }
    }, [taskTimeLeft]);

    function taskTimerTick() {
        setTaskTimeLeft((prevTimeLeft) =>
            typeof prevTimeLeft === 'number' ? prevTimeLeft - 1 : null,
        );
    }
    useUpdateEffect(() => {
        if (breakTimeLeft === 0) {
            startTaskTimer();
        }
    }, [breakTimeLeft]);

    function breakTimerTick() {
        setBreakTimeLeft((prevTimeLeft) =>
            typeof prevTimeLeft === 'number' ? prevTimeLeft - 1 : null,
        );
    }

    function startTaskTimer() {
        const randomTaskDurationInSeconds = getRandomTaskDurationInSeconds();

        if (randomTaskDurationInSeconds === null) return;

        taskStartAudio?.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
        setTimerStatus('task');
        setTaskTimeLeft(randomTaskDurationInSeconds);
    }

    function startBreakTimer() {
        const breakDurationInSeconds = getBreakDurationInSeconds();

        if (breakDurationInSeconds === null) return;

        breakStartAudio?.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
        setTimerStatus('break');
        setBreakTimeLeft(breakDurationInSeconds);
    }

    function cancelTimer() {
        if (taskTimeLeft !== null) {
            setTaskTimeLeft(null);
        }
        if (breakTimeLeft !== null) {
            setBreakTimeLeft(null);
        }
        setTimerStatus('inactive');
    }

    function getRandomTaskDurationInSeconds() {
        const { minTaskDuration, maxTaskDuration } = taskTimerPreference;

        const minCountdownTimeInSeconds = convertTimeToSeconds(
            minTaskDuration.hours,
            minTaskDuration.minutes,
            minTaskDuration.seconds,
        );
        const maxTaskDurationInSeconds = convertTimeToSeconds(
            maxTaskDuration.hours,
            maxTaskDuration.minutes,
            maxTaskDuration.seconds,
        );

        if (minCountdownTimeInSeconds >= maxTaskDurationInSeconds) {
            window.alert(
                'The minimum countdow-time must be less than the maximum countdown-time.',
            );
            return null;
        }

        return generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxTaskDurationInSeconds,
        );
    }

    function getBreakDurationInSeconds() {
        const { breakDuration } = breakTimerPreference;

        const breakDurationInSeconds = convertTimeToSeconds(
            breakDuration.hours,
            breakDuration.minutes,
            breakDuration.seconds,
        );

        if (breakDurationInSeconds === 0) {
            window.alert(
                'The minimum break duration must be at least 1 second.',
            );
            return null;
        }

        return breakDurationInSeconds;
    }

    return {
        startTimer: startTaskTimer,
        cancelTimer,
        timerStatus,
        taskTimeLeft,
        breakTimeLeft,
    };
}
