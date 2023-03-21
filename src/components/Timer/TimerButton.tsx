import type { TimerStatus } from '~/types';
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
            width='full'
            color={timerStatus === 'inactive' ? 'success' : 'error'} 
            onClick={timerStatus === 'inactive' ? onTimerStart : onTimerCancel}
            variant={timerStatus === 'inactive' ? 'filled' : 'outlined'}
        >
            {timerStatus === 'inactive' ? 'Start' : 'Cancel'}
        </Button>
    );
}
