import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import {
    convertHoursToSeconds,
    convertMinutesToSeconds,
    generateRandomNumberInRange,
} from '~/utils';
import { Button } from '../buttons';
import TimerTimePicker, { type TimerTime } from './TimerTimePicker';

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
        null,
    );

    const [breakTimeout, setBreakTimeout] = useState<NodeJS.Timeout | null>(
        null,
    );

    const [timerStatus, setTimerStatus] = useState<
        'inactive' | 'active' | 'break'
    >('inactive');

    const [minimumCountdown, setMinimumCountdown] = useState<TimerTime>({
        hours: 0,
        minutes: 2,
        seconds: 0,
    });
    const [maximumCountdown, setMaximumCountdown] = useState<TimerTime>({
        hours: 0,
        minutes: 10,
        seconds: 0,
    });
    const [breakDuration, setBreakDuration] = useState<TimerTime>({
        hours: 0,
        minutes: 0,
        seconds: 15,
    });

   

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

    function getRandomCountdownTime() {
        const minimumCountdownTime =
            convertHoursToSeconds(minimumCountdown.hours) +
            convertMinutesToSeconds(minimumCountdown.minutes) +
            minimumCountdown.seconds;
        const maximumCountdownTime =
            convertHoursToSeconds(maximumCountdown.hours) +
            convertMinutesToSeconds(maximumCountdown.minutes) +
            maximumCountdown.seconds;

        return generateRandomNumberInRange(
            minimumCountdownTime,
            maximumCountdownTime,
        );
    }

    function startTimer() {
        console.log('timer is start');
        const randomCountdownTime = getRandomCountdownTime();

        setTimeLeft(randomCountdownTime);
        const interval = setInterval(tick, 10);
        setTimerInterval(interval);
        setTimerStatus('active');
    }

    function restartTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (breakTimeout) {
            clearTimeout(breakTimeout);
        }
        const randomCountdownTime = getRandomCountdownTime();
        setTimeLeft(randomCountdownTime);
        const interval = setInterval(tick, 1000);
        setTimerInterval(interval);
    }

    function cancelTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (breakTimeout) {
            clearTimeout(breakTimeout);
        }
        setTimeLeft(0);
        setTimerStatus('inactive');
    }

    function playSound(soundType: 'timerEnds' | 'timerStarts') {
        if (soundType === 'timerStarts') {
            console.log('start');
        }

        console.log('stop');
    }

    function startBreak() {
        playSound('timerEnds');

        const timeout = setTimeout(() => {
            playSound('timerStarts');

            const randomCountdownTime = getRandomCountdownTime();

            setTimeLeft(randomCountdownTime);
            const interval = setInterval(tick, 1000);
            setTimerInterval(interval);
        }, 5000);
        setBreakTimeout(timeout);
    }

    return (
        <main className="px-4 md:px-6 lg:px-8">
            <section>
                <h2 className="sr-only">Timer controller</h2>
                {timerStatus === 'inactive' && (
                    <div className="grid gap-y-3">
                        <TimerTimePicker
                            label="Min countdown"
                            description="The minimum amount of countdown that permited"
                            timerTime={minimumCountdown}
                            onTimerTimeChange={(newMinimumCountdown) =>
                                setMinimumCountdown(newMinimumCountdown)
                            }
                        />
                        <TimerTimePicker
                            label="Max countdown"
                            description="The maximum amount of countdown that permited"
                            timerTime={maximumCountdown}
                            onTimerTimeChange={(newMaximumCountdown) =>
                                setMaximumCountdown(newMaximumCountdown)
                            }
                        />
                        <TimerTimePicker
                            label="Break duration"
                            description="After the countdown ends, how many time do you need to rest before the countdown start over."
                            timerTime={breakDuration}
                            onTimerTimeChange={(newBreakDuration) =>
                                setBreakDuration(newBreakDuration)
                            }
                        />
                    </div>
                )}
                {timerStatus === 'active' && (
                    <div>
                        <p>Timer is active</p>
                    </div>
                )}
                {timerStatus === 'break' && (
                    <div>
                        <p>Break is active</p>
                    </div>
                )}

                <div className="my-6 flex justify-center">
                    <hr className="w-4/5 border-b border-slate-800" />
                </div>

                {timerStatus === 'inactive' ? (
                    <button
                        onClick={() => startTimer()}
                        className="w-full rounded-md py-2 text-lg font-semibold text-slate-300 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        Start
                    </button>
                ) : (
                    <div className='flex gap-x-3'>
                        <Button variant="secondary" onClick={cancelTimer}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={restartTimer}>
                            Restart
                        </Button>
                    </div>
                )}
            </section>
        </main>
    );
}
