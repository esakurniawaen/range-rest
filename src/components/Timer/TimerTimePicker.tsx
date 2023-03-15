import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import ExtraInformation from '../ExtraInformation';

export interface TimerTime {
    hours: number;
    minutes: number;
    seconds: number;
}

interface TimerTimePickerProps {
    timerTime: TimerTime;
    onTimerTimeChange: (timerTime: TimerTime) => void;
    label: string;
    description: string;
}

export default function TimerTimePicker({
    label,
    description,
    timerTime,
    onTimerTimeChange,
}: TimerTimePickerProps) {
    return (
        <div className="flex justify-between rounded-md border border-slate-700 bg-slate-800 py-2 px-3">
            <p className="inline-flex items-center gap-x-1">
                {label}
                <ExtraInformation info={description} />
            </p>

            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={clsx(
                                'rounded border border-slate-700 py-1 px-2 shadow outline-none',
                                {
                                    'text-slate-300 border-indigo-400': open
                                }
                            )}
                        >
                            {timerTime.hours !== 0 &&
                                `${timerTime.hours} ${
                                    timerTime.hours <= 1 ? 'hour' : 'hours'
                                }, `}
                            {`${timerTime.minutes} ${
                                timerTime.minutes <= 1 ? 'min' : 'mins'
                            }, `}
                            {`${timerTime.seconds} ${
                                timerTime.seconds <= 1 ? 'sec' : 'secs'
                            }`}
                        </Popover.Button>

                        <Popover.Panel className="absolute left-1/2 z-50 mt-1 flex -translate-x-1/2 gap-x-3 rounded-md p-3 dark:bg-slate-700 dark:shadow-lg">
                            <TimerTimePickable
                                label="Hours"
                                pickableTimerTime={timerTime.hours}
                                onPickableTimerTimeChange={(hours) =>
                                    onTimerTimeChange({ ...timerTime, hours })
                                }
                            />
                            <TimerTimePickable
                                label="Minutes"
                                pickableTimerTime={timerTime.minutes}
                                onPickableTimerTimeChange={(minutes) =>
                                    onTimerTimeChange({ ...timerTime, minutes })
                                }
                            />
                            <TimerTimePickable
                                label="Seconds"
                                pickableTimerTime={timerTime.seconds}
                                onPickableTimerTimeChange={(seconds) =>
                                    onTimerTimeChange({ ...timerTime, seconds })
                                }
                            />
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    );
}

interface TimerTimePickableProps {
    label: string;
    pickableTimerTime: number;
    onPickableTimerTimeChange: (pickableTimerTime: number) => void;
}

function TimerTimePickable({
    label,
    pickableTimerTime,
    onPickableTimerTimeChange,
}: TimerTimePickableProps) {
    return (
        <div className="flex flex-col items-center">
            <label className="text-sm">{label}</label>
            <input
                value={String(pickableTimerTime)}
                onChange={(evt) =>
                    onPickableTimerTimeChange(Number(evt.target.value))
                }
                className="w-20 rounded text-center text-slate-300 bg-slate-600 shadow border border-transparent outline-none focus:border-indigo-500 transition"
                type="number"
            />
        </div>
    );
}
