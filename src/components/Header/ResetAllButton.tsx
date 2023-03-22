import { useTheme } from 'next-themes';
import useTimerPreferenceStore from '~/store/timerPreferenceStore';
import { Button } from '../buttons';

export default function ResetAllButton() {
    const { setTheme } = useTheme();
    const { resetBreakTimerPreference, resetTaskTimerPreference } =
        useTimerPreferenceStore();

    function handleResetAll() {
        const isContinue = window.confirm(
            "Do you want to reset everything? (that's includes, min countdown, max countdown, break duration, theme, sound when timer starts and ends)",
        );

        if (!isContinue) return;

        setTheme('system');
        resetTaskTimerPreference();
        resetBreakTimerPreference();
    }

    return (
        <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleResetAll}
            whenClickScaleDown
        >
            Reset all
        </Button>
    );
}
