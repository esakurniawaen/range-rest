import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import type { Time } from '../../types';
import ExtraInformation from '../ExtraInformation';

interface TimerTimePickerProps {
    time: Time;
    onTimeChange: (timer: Time) => void;
    label: string;
    description: string;
}

const TimerTimePicker = forwardRef<HTMLElement, TimerTimePickerProps>(
    ({ label, description, time, onTimeChange }, ref) => {
        function toDisplayTime() {
            const hourWord = time.hours > 1 ? 'hrs' : 'hr';
            const minuteWord = time.minutes > 1 ? 'mins' : 'min';
            const secondWord = time.seconds > 1 ? 'secs' : 'sec';

            if (time.hours !== 0)
                return `${time.hours} ${hourWord}, ${time.minutes} ${minuteWord}, ${time.seconds} ${secondWord}`;
            if (time.minutes !== 0)
                return `${time.minutes} ${minuteWord}, ${time.seconds} ${secondWord}`;

            return `${time.seconds} ${secondWord}`;
        }

        return (
            <div className="flex justify-between rounded-md border border-slate-300 bg-slate-200 py-2 px-3 dark:border-slate-700 dark:bg-slate-800">
                <span className="inline-flex items-center gap-x-1">
                    {label}
                    <ExtraInformation info={description} />
                </span>

                <Popover ref={ref} className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={clsx(
                                    'shadow-xs rounded  border py-1 px-2 outline-none dark:shadow',
                                    {
                                        'border-blue-500 text-slate-600 dark:border-blue-400 dark:text-slate-300':
                                            open,
                                        'border-slate-300 dark:border-slate-700':
                                            !open,
                                    },
                                )}
                            >
                                {toDisplayTime()}
                            </Popover.Button>

                            <Popover.Overlay className="fixed inset-0 z-30 bg-white/30 dark:bg-black/30" />

                            <Popover.Panel className="absolute right-0 z-40 mt-1 flex transform gap-x-3 rounded-md border border-slate-300 bg-slate-200 p-3 shadow dark:border-slate-700 dark:bg-slate-800 dark:shadow-md">
                                <TimerTimePickable
                                    label="Hours"
                                    pickableTime={time.hours}
                                    onPickableTimeChange={(hours) =>
                                        onTimeChange({ ...time, hours })
                                    }
                                />
                                <TimerTimePickable
                                    label="Minutes"
                                    pickableTime={time.minutes}
                                    onPickableTimeChange={(minutes) =>
                                        onTimeChange({ ...time, minutes })
                                    }
                                />
                                <TimerTimePickable
                                    label="Seconds"
                                    pickableTime={time.seconds}
                                    onPickableTimeChange={(seconds) =>
                                        onTimeChange({ ...time, seconds })
                                    }
                                />
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
            </div>
        );
    },
);

TimerTimePicker.displayName = 'FancyName';
export default TimerTimePicker;

interface TimerTimePickableProps {
    label: string;
    pickableTime: number;
    onPickableTimeChange: (pickableTime: number) => void;
}

function TimerTimePickable({
    label,
    pickableTime,
    onPickableTimeChange,
}: TimerTimePickableProps) {
    return (
        <div className="flex flex-col items-center">
            <label className="text-sm">{label}</label>
            <input
                value={String(pickableTime)}
                onChange={(evt) =>
                    onPickableTimeChange(Number(evt.target.value))
                }
                className="w-20 rounded border border-slate-400 bg-slate-300 py-0.5 text-center text-slate-600 outline-none transition focus:border-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:focus:border-blue-500"
                type="number"
            />
        </div>
    );
}
