import { useState } from 'react';
import { useInterval, useTimeout, useUpdateEffect } from 'usehooks-ts';
import { convertTimeToSeconds, generateRandomNumberInRange } from '~/utils';
import useTimerPreferenceStore from '../store/timerPreferenceStore';
import type { TimerStatus } from '../types';
import useAudio from './useAudio';

const TICK = 1000;
const DELAY_BEFORE_START_AGAIN = 2500;

export default function useTimer() {
    const { taskPreference, breakPreference } = useTimerPreferenceStore();

    const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
    const [taskTimeLeft, setTaskTimeLeft] = useState<number | null>(null);
    const [breakTimeLeft, setBreakTimeLeft] = useState<number | null>(null);
    const [taskLoopCount, setTaskLoopCount] = useState(0);
    const [breakLoopCount, setBreakLoopCount] = useState(0);

    useInterval(breakTimerTick, timerStatus === 'breakActive' ? TICK : null);
    useInterval(taskTimerTick, timerStatus === 'taskActive' ? TICK : null);
    useTimeout(
        startBreakTimer,
        timerStatus === 'taskEnd' ? DELAY_BEFORE_START_AGAIN : null,
    );
    useTimeout(
        startTaskTimer,
        timerStatus === 'breakEnd' ? DELAY_BEFORE_START_AGAIN : null,
    );

    function startTaskTimer() {
        const randomTaskDurationInSeconds = getRandomTaskDurationInSeconds();
        if (randomTaskDurationInSeconds === null) return;

        setTimerStatus('taskActive');
        setTaskTimeLeft(randomTaskDurationInSeconds);
        setTaskLoopCount((prevCount) => prevCount + 1);
    }

    function startBreakTimer() {
        const breakDurationInSeconds = getBreakDurationInSeconds();
        if (breakDurationInSeconds === null) return;

        setTimerStatus('breakActive');
        setBreakTimeLeft(breakDurationInSeconds);
        setBreakLoopCount((prevCount) => prevCount + 1);
    }

    const taskEndAudio = useAudio(
        `/audios/taskEnd/${taskPreference.endSound}.wav`,
    );
    const breakEndAudio = useAudio(
        `/audios/breakEnd/${breakPreference.endSound}.wav`,
    );

    function taskTimerTick() {
        setTaskTimeLeft((prevTimeLeft) =>
            typeof prevTimeLeft === 'number' ? prevTimeLeft - 1 : null,
        );
    }
    function breakTimerTick() {
        setBreakTimeLeft((prevTimeLeft) =>
            typeof prevTimeLeft === 'number' ? prevTimeLeft - 1 : null,
        );
    }
    useUpdateEffect(() => {
        if (taskTimeLeft === 0) {
            endTaskTimer();
        }
    }, [taskTimeLeft]);

    useUpdateEffect(() => {
        if (breakTimeLeft === 0) {
            endBreakTimer();
        }
    }, [breakTimeLeft]);

    function endTaskTimer() {
        taskEndAudio?.play(); /* eslint-disable-line */
        setTimerStatus('taskEnd');
        setTaskTimeLeft(null);
    }

    function endBreakTimer() {
        breakEndAudio?.play(); /* eslint-disable-line */
        setTimerStatus('breakEnd');
        setBreakTimeLeft(null);
    }

    function cancelTimer() {
        if (taskTimeLeft !== null) {
            setTaskTimeLeft(null);
        }
        if (breakTimeLeft !== null) {
            setBreakTimeLeft(null);
        }
        setTimerStatus('idle');
    }

    function getRandomTaskDurationInSeconds() {
        const { minTaskDuration, maxTaskDuration } = taskPreference;

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
                'The minimum countdown-duration must be less than the maximum countdown-duration.',
            );
            return null;
        }

        return generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxTaskDurationInSeconds,
        );
    }

    function getBreakDurationInSeconds() {
        const { breakDuration } = breakPreference;

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
        startTimer: () => startTaskTimer(),
        taskLoopCount,
        breakLoopCount,
        cancelTimer,
        timerStatus,
        taskTimeLeft,
        breakTimeLeft,
    };
}
