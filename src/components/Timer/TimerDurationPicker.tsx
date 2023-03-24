import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef, Fragment } from 'react';
import type { Duration } from '~/types';
import ExtraInformation from '../ExtraInformation';

interface TimerDurationPickerProps {
    duration: Duration;
    onTimeChange: (duration: Duration) => void;
    label: string;
    description: string;
}

const TimerDurationPicker = forwardRef<HTMLElement, TimerDurationPickerProps>(
    ({ label, description, duration, onTimeChange }, ref) => {
        function toDisplayTime() {
            const hourWord = duration.hours > 1 ? 'hrs' : 'hr';
            const minuteWord = duration.minutes > 1 ? 'mins' : 'min';
            const secondWord = duration.seconds > 1 ? 'secs' : 'sec';

            if (duration.hours !== 0)
                return `${duration.hours} ${hourWord}, ${duration.minutes} ${minuteWord}, ${duration.seconds} ${secondWord}`;
            if (duration.minutes !== 0)
                return `${duration.minutes} ${minuteWord}, ${duration.seconds} ${secondWord}`;

            return `${duration.seconds} ${secondWord}`;
        }

        return (
            <div className="flex justify-between rounded-md border border-slate-300 bg-slate-200 py-2 px-3 dark:border-slate-700 dark:bg-slate-800">
                <span className="inline-flex items-center gap-x-1">
                    {label}
                    <ExtraInformation info={description} />
                </span>

                <Popover ref={ref} className="relative">
                    {({ open }) => (
                        <Fragment>
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
                                <TimerDurationPickable
                                    label="Hours"
                                    pickableDuration={duration.hours}
                                    onPickableDurationChange={(hours) =>
                                        onTimeChange({
                                            ...duration,
                                            hours: Math.min(hours, 23),
                                        })
                                    }
                                    max={23}
                                />
                                <TimerDurationPickable
                                    label="Minutes"
                                    pickableDuration={duration.minutes}
                                    onPickableDurationChange={(minutes) =>
                                        onTimeChange({
                                            ...duration,
                                            minutes: Math.min(minutes, 59),
                                        })
                                    }
                                    max={59}
                                />
                                <TimerDurationPickable
                                    label="Seconds"
                                    pickableDuration={duration.seconds}
                                    onPickableDurationChange={(seconds) =>
                                        onTimeChange({
                                            ...duration,
                                            seconds: Math.min(seconds, 59),
                                        })
                                    }
                                    max={59}
                                />
                            </Popover.Panel>
                        </Fragment>
                    )}
                </Popover>
            </div>
        );
    },
);

TimerDurationPicker.displayName = 'FancyName';
export default TimerDurationPicker;

interface TimerDurationPickable {
    label: string;
    pickableDuration: number;
    onPickableDurationChange: (pickableDuration: number) => void;
    max: number;
}

function TimerDurationPickable({
    max,
    label,
    pickableDuration,
    onPickableDurationChange,
}: TimerDurationPickable) {
    return (
        <div className="flex flex-col items-center">
            <label className="text-sm">{label}</label>
            <input
                min={0}
                max={max}
                value={String(pickableDuration)}
                onChange={(evt) =>
                    onPickableDurationChange(parseInt(evt.target.value) || 0)
                }
                className="w-20 rounded border border-slate-400 bg-slate-300 py-0.5 text-center text-slate-600 outline-none transition focus:border-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:focus:border-blue-500"
                type="number"
            />
        </div>
    );
}
