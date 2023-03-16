import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import {
    convertHoursToSeconds,
    convertMinutesToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import TimerButton from './TimerButton';
import TimerDisplay from './TimerDisplay';
import type { TimerStatus, TimerTime } from './types';

const MIN_COUNTDOWN_TIME = {
    hours: 0,
    minutes: 2,
    seconds: 0,
};

const MAX_COUNTDOWN_TIME = {
    hours: 0,
    minutes: 10,
    seconds: 0,
};

const BREAK_DURATION = {
    hours: 0,
    minutes: 0,
    seconds: 15,
};

const TICK_INTERVAL = 10;


export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
        null,
    );

    const [breakTimeout, setBreakTimeout] = useState<NodeJS.Timeout | null>(
        null,
    );

    const [timerStatus, setTimerStatus] = useState<TimerStatus>('inactive');

    const [minCountdownTime, setMinCountdownTime] = useState<TimerTime>(MIN_COUNTDOWN_TIME);
    const [maxCountdownTime, setMaxCountdownTime] = useState<TimerTime>(MAX_COUNTDOWN_TIME);
    const [breakDuration, setBreakDuration] = useState<TimerTime>(BREAK_DURATION);

    useUpdateEffect(() => {
        if (timeLeft === 0 && timerStatus === 'active') {
            if (timerInterval) {
                clearInterval(timerInterval);
            }

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
            window.alert(
                'Minimum countdown-time must be less than maximum countdown-time.',
            );
            return;
        }

        const randomCountdownTimeInSeconds = generateRandomNumberInRange(
            minCountdownTimeInSeconds,
            maxCountdownTimeInSeconds,
        );

        playSound('timerStarts');
        setTimeLeft(randomCountdownTimeInSeconds);
        const interval = setInterval(tick, TICK_INTERVAL);
        setTimerInterval(interval);
        setTimerStatus('active');
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

        setTimerStatus('inactive');
        console.log('timer is canceled');
    }

    function playSound(soundType: 'timerStarts' | 'breakStarts') {
        if (soundType === 'timerStarts') {
            console.log('start');
        }

        console.log('stop');
    }

    function startBreak() {
        playSound('breakStarts');
        setTimerStatus('break');

        const timeout = setTimeout(() => {
            startTimer();
        }, 5000);
        setBreakTimeout(timeout);
    }

    return (
        <main className="px-4 md:px-6 lg:px-8">
            <section>
                <h2 className="sr-only">Timer controller</h2>
                <TimerDisplay
                    timerStatus={timerStatus}
                    minCountdownTime={minCountdownTime}
                    onMinCountdownTimeChange={(newMinCountdownTime) =>
                        setMinCountdownTime(newMinCountdownTime)
                    }
                    maxCountdownTime={maxCountdownTime}
                    onMaxCountdownTimeChange={(newMaxCountdownTime) =>
                        setMaxCountdownTime(newMaxCountdownTime)
                    }
                    breakDuration={breakDuration}
                    onBreakDurationChange={(newBreakDuration) =>
                        setBreakDuration(newBreakDuration)
                    }
                />

                <div className="my-6 flex justify-center">
                    <hr className="w-4/5 border-b border-slate-800" />
                </div>

                <TimerButton
                    timerStatus={timerStatus}
                    onStart={() => startTimer()}
                    onCancel={() => cancelTimer()}
                />
            </section>
        </main>
    );
}
