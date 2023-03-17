import { Button } from '../buttons';
import type { TimerStatus } from './types';

type TimerButtonProps = {
    timerStatus: TimerStatus;
    onTimerCancel: () => void;
    onTimerStart: () => void;
};

export default function TimerButton({
    onTimerCancel,
    onTimerStart,
    timerStatus,
}: TimerButtonProps) {
    return (
        <Button
            onClick={() =>
                timerStatus === 'inactive' ? onTimerStart() : onTimerCancel()
            }
            variant={timerStatus === 'inactive' ? 'primary' : 'secondary'}
        >
            {timerStatus === 'inactive' ? 'Start' : 'Cancel'}
        </Button>
    );
}
