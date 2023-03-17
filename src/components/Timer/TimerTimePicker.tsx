import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import ExtraInformation from '../ExtraInformation';
import type { Time } from './types';

interface TimerTimePickerProps {
    time: Time;
    onTimeChange: (timer: Time) => void;
    label: string;
    description: string;
}

export default function TimerTimePicker({
    label,
    description,
    time,
    onTimeChange,
}: TimerTimePickerProps) {
    function toDisplayTime() {
        if (time.hours !== 0)
            return `${time.hours} ${time.hours <= 1 ? 'hour' : 'hours'}, `;
        if (time.minutes)
            return `${time.minutes} ${time.minutes <= 1 ? 'min' : 'mins'}, `;
        if (time.seconds)
            return `${time.seconds} ${time.seconds <= 1 ? 'sec' : 'secs'}`;
    }

    return (
        <div className="flex justify-between rounded-md border border-slate-700 bg-slate-800 py-2 px-3">
            <span className="inline-flex items-center gap-x-1">
                {label}
                <ExtraInformation info={description} />
            </span>

            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={clsx(
                                'rounded border border-slate-700 py-1 px-2 shadow outline-none',
                                {
                                    'border-indigo-400 text-slate-300': open,
                                },
                            )}
                        >
                            {toDisplayTime()}
                        </Popover.Button>

                        <Popover.Panel className="absolute left-1/2 z-50 mt-1 flex -translate-x-1/2 gap-x-3 rounded-md p-3 dark:bg-slate-700 dark:shadow-lg">
                            <TimerTimePickable
                                label="Hours"
                                pickableTimerTime={time.hours}
                                onPickableTimerTimeChange={(hours) =>
                                    onTimeChange({ ...time, hours })
                                }
                            />
                            <TimerTimePickable
                                label="Minutes"
                                pickableTimerTime={time.minutes}
                                onPickableTimerTimeChange={(minutes) =>
                                    onTimeChange({ ...time, minutes })
                                }
                            />
                            <TimerTimePickable
                                label="Seconds"
                                pickableTimerTime={time.seconds}
                                onPickableTimerTimeChange={(seconds) =>
                                    onTimeChange({ ...time, seconds })
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
                className="w-20 rounded border border-transparent bg-slate-600 text-center text-slate-300 shadow outline-none transition focus:border-indigo-500"
                type="number"
            />
        </div>
    );
}
