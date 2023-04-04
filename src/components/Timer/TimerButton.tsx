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
            color={timerStatus === 'Idle' ? 'success' : 'error'}
            onClick={timerStatus === 'Idle' ? onTimerStart : onTimerCancel}
            variant={timerStatus === 'Idle' ? 'filled' : 'outlined'}
        >
            {timerStatus === 'Idle' ? 'Start' : 'Cancel'}
        </Button>
    );
}
