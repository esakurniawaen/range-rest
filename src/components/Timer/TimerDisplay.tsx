import TimerTimePicker from './TimerTimePicker';
import type { TimerStatus, TimerTime } from './types';

type TimerDisplayProps = {
    timerStatus: TimerStatus;
    minCountdownTime: TimerTime;
    onMinCountdownTimeChange: (minCountdownTime: TimerTime) => void;
    maxCountdownTime: TimerTime;
    onMaxCountdownTimeChange: (maxCountdownTime: TimerTime) => void;
    breakDuration: TimerTime;
    onBreakDurationChange: (breakDuration: TimerTime) => void;
};

export default function TimerDisplay({
    timerStatus,
    minCountdownTime,
    onMinCountdownTimeChange,
    maxCountdownTime,
    onMaxCountdownTimeChange,
    breakDuration,
    onBreakDurationChange,
}: TimerDisplayProps) {
    return (
        <>
            {timerStatus === 'inactive' && (
                <div className="grid gap-y-3">
                    <TimerTimePicker
                        label="Min countdown"
                        description="The minimum amount of countdown that permited"
                        timerTime={minCountdownTime}
                        onTimerTimeChange={onMinCountdownTimeChange}
                    />
                    <TimerTimePicker
                        label="Max countdown"
                        description="The maximum amount of countdown that permited"
                        timerTime={maxCountdownTime}
                        onTimerTimeChange={onMaxCountdownTimeChange}
                    />
                    <TimerTimePicker
                        label="Break duration"
                        description="After the countdown ends, how many time do you need to rest before the countdown start over."
                        timerTime={breakDuration}
                        onTimerTimeChange={onBreakDurationChange}
                    />
                </div>
            )}
            {timerStatus === 'active' && (
                <div>
                    <p>Timer is active</p>
                </div>
            )}
            {timerStatus === 'break' && (
                <div>
                    <p>Break is active</p>
                </div>
            )}
        </>
    );
}
