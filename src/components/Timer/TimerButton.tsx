import type { TimerStatus } from '~/hooks/useTimer';
import { Button } from '../buttons';

type TimerButtonProps = {
    timerStatus: TimerStatus;
    onTimerCancel: () => void;
    onTimerStart: () => void;
};

export default function TimerButton({
    timerStatus,
    onTimerStart,
    onTimerCancel,
}: TimerButtonProps) {
    return (
        <Button
            width="full"
            color={timerStatus === 'idle' ? 'success' : 'error'}
            onClick={timerStatus === 'idle' ? onTimerStart : onTimerCancel}
            variant={timerStatus === 'idle' ? 'filled' : 'outlined'}
        >
            {timerStatus === 'idle' ? 'Start' : 'Cancel'}
        </Button>
    );
}
