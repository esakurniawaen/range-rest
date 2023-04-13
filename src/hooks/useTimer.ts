import { useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import useWorkerInterval from './useWorkerInterval';
import useWorkerTimeout from './useWorkerTimeout';
import type {
    BreakPreference,
    SessionPreference,
} from '~/store/timerPreferenceStore';
import {
    convertDurationToSeconds,
    generateRandomNumberInRange,
    getErrorMessage,
} from '~/utils';

import useAudio from './useAudio';

export type TimerStatus =
    | 'Idle'
    | 'SessionActive'
    | 'SessionEnd'
    | 'BreakActive'
    | 'BreakEnd';

const TICK = 1000;

export default function useTimer(
    sessionPreference: SessionPreference,
    breakPreference: BreakPreference,
) {
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('Idle');
    const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);
    const [breakTimeLeft, setBreakTimeLeft] = useState<number | null>(null);
    const [sessionCount, setSessionCount] = useState(0);
    const [breakCount, setBreakCount] = useState(0);
    const [sessionRestartDelay, setSessionRestartDelay] = useState(0);
    const [breakRestartDelay, setBreakRestartDelay] = useState(0);

    useWorkerInterval(
        breakTimerTick,
        timerStatus === 'BreakActive' ? TICK : null,
    );
    useWorkerInterval(
        sessionTimerTick,
        timerStatus === 'SessionActive' ? TICK : null,
    );
    useWorkerTimeout(
        startBreakTimer,
        timerStatus === 'SessionEnd' ? breakRestartDelay : null,
    );
    useWorkerTimeout(
        startSessionTimer,
        timerStatus === 'BreakEnd' ? sessionRestartDelay : null,
    );

    function startSessionTimer() {
        try {
            const randomSessionDurationInSeconds =
                getRandomSessionDurationInSeconds();
            setSessionTimeLeft(randomSessionDurationInSeconds);
            setTimerStatus('SessionActive');
            setSessionCount((prevCount) => prevCount + 1);
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    function startBreakTimer() {
        try {
            const breakDurationInSeconds = getBreakDurationInSeconds();
            setBreakTimeLeft(breakDurationInSeconds);
            setTimerStatus('BreakActive');
            setBreakCount((prevCount) => prevCount + 1);
        } catch (err) {
            alert(getErrorMessage(err));
        }
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
        setTimerStatus('SessionEnd');
        setSessionTimeLeft(null);
    }

    function endBreakTimer() {
        if (breakEndAudio) {
            breakEndAudio.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
            setSessionRestartDelay(
                parseFloat(breakEndAudio.duration.toFixed(2)) * 1000,
            );
        }
        setTimerStatus('BreakEnd');
        setBreakTimeLeft(null);
    }

    function cancelTimer() {
        setSessionTimeLeft(null);
        setBreakTimeLeft(null);
        setSessionCount(0);
        setBreakCount(0);
        setBreakRestartDelay(0);
        setSessionRestartDelay(0);
        setTimerStatus('Idle');
    }

    function getRandomSessionDurationInSeconds(): number | never {
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
            throw new Error(
                'The minimum duration must be less than the maximum duration',
            );
        }

        return generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxSessionDurationInSeconds,
        );
    }

    function getBreakDurationInSeconds(): number | never {
        const { breakDuration } = breakPreference;

        const breakDurationInSeconds = convertDurationToSeconds(
            breakDuration.hours,
            breakDuration.minutes,
            breakDuration.seconds,
        );

        if (breakDurationInSeconds === 0) {
            throw new Error(
                'The minimum break duration must be at least 1 second',
            );
        }

        return breakDurationInSeconds;
    }

    return {
        startTimer: startSessionTimer,
        timerStatus,
        sessionTimeLeft,
        sessionCount,
        breakTimeLeft,
        breakCount,
        cancelTimer,
    };
}
