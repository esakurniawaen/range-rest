import TimerTimePicker, { type TimerTime } from './TimerTimePicker';
import { useState } from 'react';

export default function Timer() {
    const [timerMinCountdown, setTimerMinCountdown] = useState<TimerTime>({
        hours: 0,
        minutes: 10,
        seconds: 0,
    });
    const [timerMaxCountdown, setTimerMaxCountdown] = useState<TimerTime>({
        hours: 0,
        minutes: 2,
        seconds: 0,
    });
    const [timerBreakDuration, setTimerBreakDuration] = useState<TimerTime>({
        hours: 0,
        minutes: 0,
        seconds: 15,
    });

    return (
        <main className="px-4 md:px-6 lg:px-8">
            <section>
                <h2 className="sr-only">Timer controller</h2>
                <div className="grid gap-y-2">
                    <TimerTimePicker
                        label="Min countdown"
                        description="The minimum amount of countdown that permited"
                        timerTime={timerMinCountdown}
                        onTimerTimeChange={(newTimerMinCountdown) =>
                            setTimerMinCountdown(newTimerMinCountdown)
                        }
                    />
                    <TimerTimePicker
                        label="Max countdown"
                        description="The maximum amount of countdown that permited"
                        timerTime={timerMaxCountdown}
                        onTimerTimeChange={(newTimerMaxCountdown) =>
                            setTimerMaxCountdown(newTimerMaxCountdown)
                        }
                    />
                    <TimerTimePicker
                        label="Break duration"
                        description="After the countdown ends, how many time do you need to rest before the countdown start over."
                        timerTime={timerBreakDuration}
                        onTimerTimeChange={(newTimerBreakDuration) =>
                            setTimerBreakDuration(newTimerBreakDuration)
                        }
                    />
                
                    <div className='flex justify-center py-6'>
                        <hr className="w-5/6 border-b border-slate-800" />
                    </div>

                    <button className="w-full rounded-md py-2 text-lg font-semibold dark:hover:bg-indigo-600 text-slate-300 dark:bg-indigo-500">
                        Start
                    </button>
                </div>
            </section>
        </main>
    );
}
