import TimerTimePicker from './TimerTimePicker';
import type { Time, TimerPreferences, TimerStatus } from './types';

type TimerDisplayProps = {
    timerPreferences: TimerPreferences
    timerStatus: TimerStatus;
    onMinCountdownTimeChange: (minCountdownTime: Time) => void;
    onMaxCountdownTimeChange: (maxCountdownTime: Time) => void;
    onBreakDurationChange: (breakDuration: Time) => void;
};

export default function TimerDisplay({
    timerPreferences,
    timerStatus,
    onMinCountdownTimeChange,
    onMaxCountdownTimeChange,
    onBreakDurationChange,
}: TimerDisplayProps) {
    const { minCountdownTime, maxCountdownTime, breakDuration } = timerPreferences;

    return (
        <>
            {timerStatus === 'inactive' ? (
                <div className="grid gap-y-3">
                    <TimerTimePicker
                        label="Min countdown"
                        description="The minimum amount of countdown that permited"
                        time={minCountdownTime}
                        onTimeChange={onMinCountdownTimeChange}
                    />
                    <TimerTimePicker
                        label="Max countdown"
                        description="The maximum amount of countdown that permited"
                        time={maxCountdownTime}
                        onTimeChange={onMaxCountdownTimeChange}
                    />
                    <TimerTimePicker
                        label="Break duration"
                        description="After the countdown ends, how many time do you need to rest before the countdown start over."
                        time={breakDuration}
                        onTimeChange={onBreakDurationChange}
                    />
                </div>
            ) : (
                <div>
                    <p>
                        {timerStatus === 'active'
                            ? 'Timer is active'
                            : 'Break is active'}
                    </p>
                </div>
            )}
        </>
    );
}
