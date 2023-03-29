import { useState } from 'react';
import { useInterval, useTimeout, useUpdateEffect } from 'usehooks-ts';
import type {
    BreakPreference,
    SessionPreference,
} from '~/store/timerPreferenceStore';
import { convertDurationToSeconds, generateRandomNumberInRange } from '~/utils';
import useAudio from './useAudio';

export type TimerStatus =
    | 'idle'
    | 'sessionActive'
    | 'sessionEnd'
    | 'breakActive'
    | 'breakEnd';

const TICK = 1000;

export default function useTimer(
    sessionPreference: SessionPreference,
    breakPreference: BreakPreference,
) {
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
    const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);
    const [breakTimeLeft, setBreakTimeLeft] = useState<number | null>(null);
    const [sessionCount, setSessionCount] = useState(0);
    const [breakCount, setBreakCount] = useState(0);
    const [sessionRestartDelay, setSessionRestartDelay] = useState(0);
    const [breakRestartDelay, setBreakRestartDelay] = useState(0);

    useInterval(breakTimerTick, timerStatus === 'breakActive' ? TICK : null);
    useInterval(
        sessionTimerTick,
        timerStatus === 'sessionActive' ? TICK : null,
    );
    useTimeout(
        startBreakTimer,
        timerStatus === 'sessionEnd' ? breakRestartDelay : null,
    );
    useTimeout(
        startSessionTimer,
        timerStatus === 'breakEnd' ? sessionRestartDelay : null,
    );

    function startSessionTimer() {
        const randomSessionDurationInSeconds =
            getRandomSessionDurationInSeconds();
        if (randomSessionDurationInSeconds === null) return;

        setTimerStatus('sessionActive');
        setSessionTimeLeft(randomSessionDurationInSeconds);
        setSessionCount((prevCount) => prevCount + 1);
    }

    function startBreakTimer() {
        const breakDurationInSeconds = getBreakDurationInSeconds();
        if (breakDurationInSeconds === null) return;

        setTimerStatus('breakActive');
        setBreakTimeLeft(breakDurationInSeconds);
        setBreakCount((prevCount) => prevCount + 1);
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
        if (sessionEndAudio) {
            sessionEndAudio.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
            setBreakRestartDelay(
                parseFloat(sessionEndAudio.duration.toFixed(2)) * 1000,
            );
        }
        setTimerStatus('sessionEnd');
        setSessionTimeLeft(null);
    }

    function endBreakTimer() {
        if (breakEndAudio) {
            breakEndAudio.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
            setSessionRestartDelay(
                parseFloat(breakEndAudio.duration.toFixed(2)) * 1000,
            );
        }
        setTimerStatus('breakEnd');
        setBreakTimeLeft(null);
    }

    function cancelTimer() {
        setSessionTimeLeft(null);
        setBreakTimeLeft(null);
        setSessionCount(0);
        setBreakCount(0);
        setBreakRestartDelay(0);
        setSessionRestartDelay(0);
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
        timerStatus,
        sessionTimeLeft,
        sessionCount,
        breakTimeLeft,
        breakCount,
        cancelTimer,
    };
}
