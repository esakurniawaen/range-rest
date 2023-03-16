import { Button } from '../buttons';
import type { TimerStatus } from './types';


type TimerButtonProps = {
    timerStatus: TimerStatus;
    onStart: () => void;
    onCancel: () => void;
};

export default function TimerButton({
    timerStatus,
    onStart,
    onCancel,
}: TimerButtonProps) {
    return (
        <Button
            onClick={() =>
                timerStatus === 'inactive' ? onStart() : onCancel()
            }
            variant={timerStatus === 'inactive' ? 'primary' : 'secondary'}
        >
            {timerStatus === 'inactive' ? 'Start' : 'Cancel'}
        </Button>
    );
}
