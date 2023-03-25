import { useState } from 'react';
import { useInterval, useTimeout, useUpdateEffect } from 'usehooks-ts';
import { convertDurationToSeconds, generateRandomNumberInRange } from '~/utils';
import useTimerPreferenceStore from '../store/timerPreferenceStore';
import type { TimerStatus } from '../types';
import useAudio from './useAudio';

const TICK = 1000;
const DELAY_BEFORE_RESTART = 2500;

export default function useTimer() {
    const { sessionPreference, breakPreference } = useTimerPreferenceStore();

    const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
    const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);
    const [breakTimeLeft, setBreakTimeLeft] = useState<number | null>(null);
    const [sessionLoopCount, setSessionLoopCount] = useState(0);
    const [breakLoopCount, setBreakLoopCount] = useState(0);

    useInterval(breakTimerTick, timerStatus === 'breakActive' ? TICK : null);
    useInterval(
        sessionTimerTick,
        timerStatus === 'sessionActive' ? TICK : null,
    );
    useTimeout(
        startBreakTimer,
        timerStatus === 'sessionEnd' ? DELAY_BEFORE_RESTART : null,
    );
    useTimeout(
        startSessionTimer,
        timerStatus === 'breakEnd' ? DELAY_BEFORE_RESTART : null,
    );

    function startSessionTimer() {
        const randomSessionDurationInSeconds =
            getRandomSessionDurationInSeconds();
        if (randomSessionDurationInSeconds === null) return;

        setTimerStatus('sessionActive');
        setSessionTimeLeft(randomSessionDurationInSeconds);
        setSessionLoopCount((prevCount) => prevCount + 1);
    }

    function startBreakTimer() {
        const breakDurationInSeconds = getBreakDurationInSeconds();
        if (breakDurationInSeconds === null) return;

        setTimerStatus('breakActive');
        setBreakTimeLeft(breakDurationInSeconds);
        setBreakLoopCount((prevCount) => prevCount + 1);
    }

    const sessionEndAudio = useAudio(
        `/audios/sessionEnd/${sessionPreference.endSound}.wav`,
    );
    const breakEndAudio = useAudio(
        `/audios/breakEnd/${breakPreference.endSound}.wav`,
    );

    function sessionTimerTick() {
        setSessionTimeLeft((prevTimeLeft) =>
            typeof prevTimeLeft === 'number' ? prevTimeLeft - 1 : null,
        );
    }
    function breakTimerTick() {
        setBreakTimeLeft((prevTimeLeft) =>
            typeof prevTimeLeft === 'number' ? prevTimeLeft - 1 : null,
        );
    }
    useUpdateEffect(() => {
        if (sessionTimeLeft === 0) {
            endSessionTimer();
        }
    }, [sessionTimeLeft]);

    useUpdateEffect(() => {
        if (breakTimeLeft === 0) {
            endBreakTimer();
        }
    }, [breakTimeLeft]);

    function endSessionTimer() {
        sessionEndAudio?.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
        setTimerStatus('sessionEnd');
        setSessionTimeLeft(null);
    }

    function endBreakTimer() {
        breakEndAudio?.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
        setTimerStatus('breakEnd');
        setBreakTimeLeft(null);
    }

    function cancelTimer() {
        if (sessionTimeLeft !== null) {
            setSessionTimeLeft(null);
        }
        if (breakTimeLeft !== null) {
            setBreakTimeLeft(null);
        }
        setTimerStatus('idle');
    }

    function getRandomSessionDurationInSeconds() {
        const { minSessionDuration, maxSessionDuration } = sessionPreference;

        const minCountdownTimeInSeconds = convertDurationToSeconds(
            minSessionDuration.hours,
            minSessionDuration.minutes,
            minSessionDuration.seconds,
        );
        const maxSessionDurationInSeconds = convertDurationToSeconds(
            maxSessionDuration.hours,
            maxSessionDuration.minutes,
            maxSessionDuration.seconds,
        );

        if (minCountdownTimeInSeconds >= maxSessionDurationInSeconds) {
            window.alert(
                'The minimum countdown-duration must be less than the maximum countdown-duration.',
            );
            return null;
        }

        return generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxSessionDurationInSeconds,
        );
    }

    function getBreakDurationInSeconds() {
        const { breakDuration } = breakPreference;

        const breakDurationInSeconds = convertDurationToSeconds(
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
        startTimer: () => startSessionTimer(),
        sessionLoopCount,
        breakLoopCount,
        cancelTimer,
        timerStatus,
        sessionTimeLeft,
        breakTimeLeft,
    };
}
