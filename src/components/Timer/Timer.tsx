import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import TimerButton from './TimerButton';
import TimerDisplay from './TimerDisplay';
import type { Time, TimerPreferences, TimerStatus } from './types';

const DEFAULT_MIN_COUNTDOWN_TIME: Time = {
    hours: 0,
    minutes: 2,
    seconds: 0,
};

const DEFAULT_MAX_COUNTDOWN_TIME: Time = {
    hours: 0,
    minutes: 10,
    seconds: 0,
};

const DEFAULT_BREAK_DURATION: Time = {
    hours: 0,
    minutes: 0,
    seconds: 3,
};

const DEFAULT_TIMER_PREFERENCES = {
    minCountdownTime: DEFAULT_MIN_COUNTDOWN_TIME,
    maxCountdownTime: DEFAULT_MAX_COUNTDOWN_TIME,
    breakDuration: DEFAULT_BREAK_DURATION,
};

export default function Timer() {
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('inactive');
    const [timerTimeLeft, setTimerTimeLeft] = useState(0);
    const [timerPreferences, setTimerPreferences] =
        useLocalStorage<TimerPreferences>(
            'timerPreferences',
            DEFAULT_TIMER_PREFERENCES,
        );
    // const {startTimer, cancelTimer, timerStatus, timerTimeLeft} = useTimer(timerPreferences ?? DEFAULT_TIMER_PREFERENCES)

    function setTimerPreferenceField<K extends keyof TimerPreferences>(
        key: K,
        value: TimerPreferences[K],
    ) {
        const updatedTimerPreferences = {
            ...timerPreferences,
            [key]: value,
        } as TimerPreferences;

        setTimerPreferences(updatedTimerPreferences);
    }

    if (!timerPreferences) return null;

    return (
        <main className="px-4 md:px-6 lg:px-8">
            <section>
                <h2 className="sr-only">Timer controller</h2>
                <TimerDisplay
                    timerPreferences={timerPreferences}
                    timerStatus={timerStatus}
                    onMinCountdownTimeChange={(minCountdownTime) =>
                        setTimerPreferenceField(
                            'minCountdownTime',
                            minCountdownTime,
                        )
                    }
                    onMaxCountdownTimeChange={(maxCountdownTime) =>
                        setTimerPreferenceField(
                            'maxCountdownTime',
                            maxCountdownTime,
                        )
                    }
                    onBreakDurationChange={(breakDuration) =>
                        setTimerPreferenceField('breakDuration', breakDuration)
                    }
                />

                <div className="my-6 flex justify-center">
                    <hr className="w-4/5 border-b border-slate-800" />
                </div>

                <TimerButton
                    timerPreferences={timerPreferences}
                    timerStatus={timerStatus}
                    timerTimeLeft={timerTimeLeft}
                    onTimerStatusChange={(status) => setTimerStatus(status)}
                    onTimerTimeLeftChange={(timeLeft) =>
                        setTimerTimeLeft(timeLeft)
                    }
                />
            </section>
        </main>
    );
}
