import { Fragment } from 'react';
import useTimerPreferenceStore from '~/store/timerPreferenceStore';
import type { TimerStatus } from '~/types';
import { convertRegularNumberToOrdinal } from '~/utils';
import ClientOnly from '../ClientOnly';
import TimerDurationPicker from './TimerDurationPicker';

type TimerDisplayProps = {
    timerStatus: TimerStatus;
    sessionLoopCount: number;
};

export default function TimerDisplay({
    timerStatus,
    sessionLoopCount,
}: TimerDisplayProps) {
    const {
        sessionPreference,
        breakPreference,
        setSessionPreference,
        setBreakPreference,
    } = useTimerPreferenceStore();

    return (
        <ClientOnly as={Fragment}>
            {timerStatus === 'idle' ? (
                <div className="grid gap-y-3">
                    <TimerDurationPicker
                        label="Minimum"
                        description="The minimum amount of duration allowed for a timer."
                        duration={sessionPreference.minSessionDuration}
                        onTimeChange={(minSessionDuration) =>
                            setSessionPreference(
                                'minSessionDuration',
                                minSessionDuration,
                            )
                        }
                    />
                    <TimerDurationPicker
                        label="Maximum"
                        description="The maximum amount of duration allowed for a timer."
                        duration={sessionPreference.maxSessionDuration}
                        onTimeChange={(maxSessionDuration) =>
                            setSessionPreference(
                                'maxSessionDuration',
                                maxSessionDuration,
                            )
                        }
                    />
                    <TimerDurationPicker
                        label="Break duration"
                        description="When the timer ends, how long do you need to rest before it restarts."
                        duration={breakPreference.breakDuration}
                        onTimeChange={(breakDuration) =>
                            setBreakPreference('breakDuration', breakDuration)
                        }
                    />
                </div>
            ) : (
                <div className="flex h-[180px] flex-col items-center justify-center gap-y-3 ">
                    {timerStatus === 'sessionActive' && (
                        <Fragment>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-9 w-9 animate-spin fill-orange-500 dark:fill-orange-400"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18.513 7.119c.958-1.143 1.487-2.577 1.487-4.036v-3.083h-16v3.083c0 1.459.528 2.892 1.487 4.035l3.087 3.68c.566.677.57 1.625.009 2.306l-3.13 3.794c-.937 1.136-1.453 2.555-1.453 3.995v3.107h16v-3.107c0-1.44-.517-2.858-1.453-3.994l-3.13-3.794c-.562-.681-.558-1.629.009-2.306l3.087-3.68zm-.513-4.12c0 1.101-.363 2.05-1.02 2.834l-.978 1.167h-8.004l-.978-1.167c-.66-.785-1.02-1.736-1.02-2.834h12zm-.996 15.172c.652.791.996 1.725.996 2.829h-1.061c-1.939-2-4.939-2-4.939-2s-3 0-4.939 2h-1.061c0-1.104.344-2.039.996-2.829l3.129-3.793c.342-.415.571-.886.711-1.377h.164v1h2v-1h.163c.141.491.369.962.711 1.376l3.13 3.794zm-6.004-1.171h2v1h-2v-1zm0-2h2v1h-2v-1z" />
                            </svg>

                            <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                                Timer is Active
                            </span>
                            <span>
                                Currently on{' '}
                                {convertRegularNumberToOrdinal(
                                    sessionLoopCount,
                                )}
                                loop.
                            </span>
                        </Fragment>
                    )}
                    {timerStatus === 'breakActive' && (
                        <Fragment>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-9 w-9 animate-pulse fill-purple-500 dark:fill-purple-400"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18.513 7.119c.958-1.143 1.487-2.577 1.487-4.036v-3.083h-16v3.083c0 1.459.528 2.892 1.487 4.035l3.086 3.68c.567.677.571 1.625.009 2.306l-3.13 3.794c-.936 1.136-1.452 2.555-1.452 3.995v3.107h16v-3.107c0-1.44-.517-2.858-1.453-3.994l-3.13-3.794c-.562-.681-.558-1.629.009-2.306l3.087-3.68zm-4.639 7.257l3.13 3.794c.652.792.996 1.726.996 2.83h-1.061c-.793-2.017-4.939-5-4.939-5s-4.147 2.983-4.94 5h-1.06c0-1.104.343-2.039.996-2.829l3.129-3.793c1.167-1.414 1.159-3.459-.019-4.864l-3.086-3.681c-.66-.785-1.02-1.736-1.02-2.834h12c0 1.101-.363 2.05-1.02 2.834l-3.087 3.68c-1.177 1.405-1.185 3.451-.019 4.863z" />
                            </svg>
                            <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                                Break is Active
                            </span>
                        </Fragment>
                    )}
                    {timerStatus === 'sessionEnd' && (
                        <div>Starting a break...</div>
                    )}
                    {timerStatus === 'breakEnd' && (
                        <div>Starting a timer...</div>
                    )}
                </div>
            )}
        </ClientOnly>
    );
}
