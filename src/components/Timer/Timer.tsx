import { useUpdateEffect } from 'usehooks-ts';
import useTimer from '~/hooks/useTimer';
import TimerButton from './TimerButton';
import TimerDisplay from './TimerDisplay';

export default function Timer() {
    const {
        startTimer,
        cancelTimer,
        timerStatus,
        sessionTimeLeft,
        breakTimeLeft,
        sessionLoopCount,
    } = useTimer();

    useUpdateEffect(() => {
        console.log('Session: ', sessionTimeLeft);
    }, [sessionTimeLeft]);

    useUpdateEffect(() => {
        console.log('Break: ', breakTimeLeft);
    }, [breakTimeLeft]);

    return (
        <main className="px-4 md:px-6 lg:px-8">
            <section>
                <h2 className="sr-only">Timer controller</h2>
                <TimerDisplay
                    sessionLoopCount={sessionLoopCount}
                    timerStatus={timerStatus}
                />

                <div className="my-6 flex justify-center">
                    <hr className="w-4/5 border-b border-slate-200 dark:border-slate-800" />
                </div>

                <TimerButton
                    timerStatus={timerStatus}
                    onTimerCancel={cancelTimer}
                    onTimerStart={startTimer}
                />
            </section>
        </main>
    );
}
