import { useTheme } from 'next-themes';
import useTimerPreferenceStore from '~/store/timerPreferenceStore';
import { Button } from '../buttons';

export default function ResetAllButton() {
    const { setTheme } = useTheme();
    const { resetSessionPreference, resetBreakPreference } =
        useTimerPreferenceStore();

    function handleResetEverything() {
        const isContinue = window.confirm(
            "Do you want to reset everything? (that's includes, min countdown, max countdown, break duration, theme, sound when timer starts and ends)",
        );

        if (!isContinue) return;

        setTheme('system');
        resetSessionPreference(); 
        resetBreakPreference();
    }

    return (
        <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleResetEverything}
            whenClickScaleDown
        >
            Reset all
        </Button>
    );
}
