import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useTheme, { type Theme } from '~/hooks/useTheme';
import { Fragment } from 'react';
import { useUpdateEffect } from 'usehooks-ts';
import useAudio from '~/hooks/useAudio';
import useTimerPreferenceStore from '~/store/timerPreferenceStore';
import { IconButton } from '../buttons';
import ClientOnly from '../ClientOnly';
import ResetAllButton from './ResetAllButton';
import SettingSelect from './SettingSelect';

type SettingsPopupProps = { open: boolean; onClose: () => void };

export default function SettingsPopup({ open, onClose }: SettingsPopupProps) {
    const { theme, themes, setTheme } = useTheme();
    const {
        sessionPreference,
        breakPreference,
        setSessionPreference,
        setBreakPreference,
    } = useTimerPreferenceStore();

    usePlaySoundWhenChanged(
        sessionPreference.endSound,
        breakPreference.endSound,
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-lg bg-slate-200 shadow dark:bg-slate-800 dark:shadow-md">
                    <div className="flex items-center gap-x-2 rounded-t-lg bg-slate-300/30 py-3 pl-4 shadow-sm dark:bg-slate-700/30 dark:shadow">
                        <IconButton onClick={onClose}>
                            <ArrowLeftIcon className="h-6 w-6" />
                        </IconButton>
                        <Dialog.Title className="font-serif text-lg font-semibold text-slate-600 dark:text-slate-300">
                            Settings
                        </Dialog.Title>
                    </div>

                    <ul className="my-1 divide-y divide-slate-300 px-6 dark:divide-slate-700">
                        <ClientOnly as={Fragment}>
                            <SettingSelect
                                label="Theme"
                                options={themes}
                                selectedOption={theme as Theme}
                                onSelectedOptionChange={(nextTheme) =>
                                    setTheme(nextTheme)
                                }
                            />
                        </ClientOnly>

                        <SettingSelect
                            label="Sound when timer ends"
                            options={sessionPreference.endSounds}
                            selectedOption={sessionPreference.endSound}
                            onSelectedOptionChange={(sessionEndSound) =>
                                setSessionPreference(
                                    'endSound',
                                    sessionEndSound,
                                )
                            }
                        />
                        <SettingSelect
                            label="Sound when break ends"
                            options={breakPreference.endSounds}
                            selectedOption={breakPreference.endSound}
                            onSelectedOptionChange={(breakEndSound) =>
                                setBreakPreference('endSound', breakEndSound)
                            }
                        />
                    </ul>

                    <div className="mb-6 pl-6">
                        <ResetAllButton />
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

function usePlaySoundWhenChanged(
    sessionEndSound: string,
    breakEndSound: string,
) {
    const sessionEndAudio = useAudio(
        `/audios/sessionEnd/${sessionEndSound}.wav`,
    );
    const breakEndAudio = useAudio(`/audios/breakEnd/${breakEndSound}.wav`);

    useUpdateEffect(() => {
        sessionEndAudio?.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
    }, [sessionEndSound]);

    useUpdateEffect(() => {
        breakEndAudio?.play(); /* eslint-disable-line @typescript-eslint/no-floating-promises */
    }, [breakEndSound]);
}
