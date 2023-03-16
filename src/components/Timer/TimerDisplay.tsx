import TimerTimePicker from './TimerTimePicker';
import type { Timer, TimerTime } from './types';

type TimerDisplayProps = {
    timer: Timer;
    onMinCountdownTimeChange: (minCountdownTime: TimerTime) => void;
    onMaxCountdownTimeChange: (maxCountdownTime: TimerTime) => void;
    onBreakDurationChange: (breakDuration: TimerTime) => void;
};

export default function TimerDisplay({
    timer,
    onMinCountdownTimeChange,
    onMaxCountdownTimeChange,
    onBreakDurationChange,
}: TimerDisplayProps) {
    return (
        <>
            {timer.status === 'inactive' ? (
                <div className="grid gap-y-3">
                    <TimerTimePicker
                        label="Min countdown"
                        description="The minimum amount of countdown that permited"
                        timerTime={timer.minCountdownTime}
                        onTimerTimeChange={onMinCountdownTimeChange}
                    />
                    <TimerTimePicker
                        label="Max countdown"
                        description="The maximum amount of countdown that permited"
                        timerTime={timer.maxCountdownTime}
                        onTimerTimeChange={onMaxCountdownTimeChange}
                    />
                    <TimerTimePicker
                        label="Break duration"
                        description="After the countdown ends, how many time do you need to rest before the countdown start over."
                        timerTime={timer.breakDuration}
                        onTimerTimeChange={onBreakDurationChange}
                    />
                </div>
            ) : (
                <div>
                    <p>
                        {timer.status === 'active'
                            ? 'Timer is active'
                            : 'Break is active'}
                    </p>
                </div>
            )}
        </>
    );
}
