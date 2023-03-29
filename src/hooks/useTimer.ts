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
const DELAY_BEFORE_RESTART = 1000;

export default function useTimer(
    sessionPreference: SessionPreference,
    breakPreference: BreakPreference,
) {
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
    const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);
    const [breakTimeLeft, setBreakTimeLeft] = useState<number | null>(null);
    const [sessionCount, setSessionCount] = useState(0);
    const [breakCount, setBreakCount] = useState(0);

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
        if (sessionCount !== 0) {
            setSessionCount(0);
        }
        if (breakCount !== 0) {
            setBreakCount(0);
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
        timerStatus,
        sessionTimeLeft,
        sessionCount,
        breakTimeLeft,
        breakCount,
        cancelTimer,
    };
}
