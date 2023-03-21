import clsx from 'clsx';
import useTimerPreferenceStore from '~/store/timerPreferenceStore';
import type { TimerStatus } from '~/types';
import TimerTimePicker from './TimerTimePicker';

type TimerDisplayProps = {
    timerStatus: TimerStatus;
};

export default function TimerDisplay({ timerStatus }: TimerDisplayProps) {
    const {
        taskTimerPreference,
        breakTimerPreference,
        setTaskTimerPreference,
        setBreakTimerPreference,
    } = useTimerPreferenceStore();

    return (
        <>
            {timerStatus === 'inactive' ? (
                <div className="grid gap-y-3">
                    <TimerTimePicker
                        label="Min countdown"
                        description="The minimum amount of countdown that permited"
                        time={taskTimerPreference.minTaskDuration}
                        onTimeChange={(minTaskDuration) =>
                            setTaskTimerPreference(
                                'minTaskDuration',
                                minTaskDuration,
                            )
                        }
                    />
                    <TimerTimePicker
                        label="Max countdown"
                        description="The maximum amount of countdown that permited"
                        time={taskTimerPreference.maxTaskDuration}
                        onTimeChange={(maxTaskDuration) =>
                            setTaskTimerPreference(
                                'maxTaskDuration',
                                maxTaskDuration,
                            )
                        }
                    />
                    <TimerTimePicker
                        label="Break duration"
                        description="After the countdown ends, how many time do you need to rest before the countdown start over again."
                        time={breakTimerPreference.breakDuration}
                        onTimeChange={(breakDuration) =>
                            setBreakTimerPreference(
                                'breakDuration',
                                breakDuration,
                            )
                        }
                    />
                </div>
            ) : (
                <div className="grid h-[180px] place-items-center gap-y-1">
                    <p
                        className={clsx('animate-pulse text-xl font-bold', {
                            'text-orange-400': timerStatus === 'task',
                            'text-purple-400': timerStatus === 'break',
                        })}
                    >
                        {timerStatus === 'task'
                            ? 'Timer is active'
                            : 'Break is active'}
                    </p>
                </div>
            )}
        </>
    );
}
