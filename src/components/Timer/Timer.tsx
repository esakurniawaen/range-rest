import { time } from 'console';
import { useEffect } from 'react';
import { useMap } from 'react-use';
import TimerButton from './TimerButton';
import TimerDisplay from './TimerDisplay';
import type { Timer } from './types';

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

const INITIAL_TIMER: Timer = {
    timeLeft: 0,
    interval: null,
    timeout: null,
    status: 'inactive',
    minCountdownTime: MIN_COUNTDOWN_TIME,
    maxCountdownTime: MAX_COUNTDOWN_TIME,
    breakDuration: BREAK_DURATION,
};

export default function Timer() {
    const [timer, { set: setTimerField }] = useMap(INITIAL_TIMER);

    useEffect(() => {
        // clear the intnerval and tmeout when the component unmounts
        return () => {
            if (timer.interval) {
                clearInterval(timer.interval);
            }
            if (timer.timeout) {
                clearTimeout(timer.timeout);
            }
        };
    }, []);

    return (
        <main className="px-4 md:px-6 lg:px-8">
            <section>
                <h2 className="sr-only">Timer controller</h2>
                <TimerDisplay
                    timer={timer}
                    onMinCountdownTimeChange={(minCountdownTime) =>
                        setTimerField('minCountdownTime', minCountdownTime)
                    }
                    onMaxCountdownTimeChange={(maxCountdownTime) =>
                        setTimerField('maxCountdownTime', maxCountdownTime)
                    }
                    onBreakDurationChange={(breakDuration) =>
                        setTimerField('breakDuration', breakDuration)
                    }
                />

                <div className="my-6 flex justify-center">
                    <hr className="w-4/5 border-b border-slate-800" />
                </div>

                <TimerButton
                    timer={timer}
                    onTimerStatusChange={(timerStatus) =>
                        setTimerField('status', timerStatus)
                    }
                    onTimerIntervalChange={(interval) =>
                        setTimerField('interval', interval)
                    }
                    onTimerTimeLeftChange={(timeLeft) =>
                        setTimerField('timeLeft', timeLeft)
                    }
                    onTimerTimeoutChange={(timeout) =>
                        setTimerField('timeout', timeout)
                    }
                />
            </section>
        </main>
    );
}
