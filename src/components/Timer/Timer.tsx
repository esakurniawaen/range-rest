import { useState } from 'react';
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

export default function Timer() {
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('inactive');
    const [minCountdownTime, setMinCountdownTime] =
        useState<TimerTime>(MIN_COUNTDOWN_TIME);
    const [maxCountdownTime, setMaxCountdownTime] =
        useState<TimerTime>(MAX_COUNTDOWN_TIME);
    const [breakDuration, setBreakDuration] =
        useState<TimerTime>(BREAK_DURATION);

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
                    onTimerStatusChange={(newTimerStatus) =>
                        setTimerStatus(newTimerStatus)
                    }
                    minCountdownTime={minCountdownTime}
                    maxCountdownTime={maxCountdownTime}
                    breakDuration={breakDuration}
                />
            </section>
        </main>
    );
}
