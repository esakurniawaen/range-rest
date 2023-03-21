import { Dialog, Listbox } from '@headlessui/react';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';
import useTimerPreferenceStore from '~/store/timerPreferenceStore';
import type { Theme } from '~/types';
import { capitalizeFirstLetter } from '~/utils';
import { IconButton } from '../buttons';
import ClientOnly from '../ClientOnly';
import ResetAllButton from './ResetAllButton';

type SettingsPopupProps = { open: boolean; onClose: () => void };

export default function SettingsPopup({ open, onClose }: SettingsPopupProps) {
    const { theme, themes, setTheme } = useTheme();
    const {
        taskTimerPreference,
        breakTimerPreference,
        setTaskTimerPreference,
        setBreakTimerPreference,
    } = useTimerPreferenceStore();

    return (
        <Dialog open={open} onClose={onClose}>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="shadown w-full max-w-sm rounded-lg bg-slate-800 dark:shadow-md">
                    <div className="flex items-center gap-x-2 bg-slate-700/60 py-3 pl-4 shadow">
                        <IconButton onClick={onClose}>
                            <ArrowLeftIcon className="h-6 w-6" />
                        </IconButton>
                        <Dialog.Title className="font-serif text-lg font-semibold text-slate-300">
                            Settings
                        </Dialog.Title>
                    </div>

                    <ul className="my-1 divide-y divide-slate-700 px-6">
                        <ClientOnly as={Fragment}>
                            <SettingSelect
                                label="Theme"
                                options={themes}
                                selectedOption={theme as string}
                                onSelectedOptionChange={(nextTheme) =>
                                    setTheme(nextTheme)
                                }
                            />
                        </ClientOnly>

                        <SettingSelect
                            label="Sound when timer starts"
                            options={taskTimerPreference.startSounds}
                            selectedOption={taskTimerPreference.startSound}
                            onSelectedOptionChange={(taskStartSound) =>
                                setTaskTimerPreference(
                                    'startSound',
                                    taskStartSound,
                                )
                            }
                        />
                        <SettingSelect
                            label="Sound when break starts"
                            options={breakTimerPreference.startSounds}
                            selectedOption={breakTimerPreference.startSound}
                            onSelectedOptionChange={(breakStartSound) =>
                                setBreakTimerPreference(
                                    'startSound',
                                    breakStartSound,
                                )
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

type SettingSelectProps<T> = {
    label: string;
    options: T[];
    selectedOption: T;
    onSelectedOptionChange: (option: T) => void;
};

function SettingSelect<T extends Theme | string>({
    label,
    options,
    selectedOption,
    onSelectedOptionChange,
}: SettingSelectProps<T>) {
    return (
        <li className="flex justify-between py-4">
            <span>{label}</span>
            <Listbox value={selectedOption} onChange={onSelectedOptionChange}>
                <div className="relative">
                    <Listbox.Button className="rounded border border-slate-700 py-1 px-2">
                        {capitalizeFirstLetter(selectedOption)}
                    </Listbox.Button>

                    <Listbox.Options className="absolute left-1/2 z-10 mt-1 -translate-x-1/2 divide-y divide-slate-600 rounded bg-slate-700 py-1 shadow dark:shadow-md">
                        {options.map((option, optionIdx) => (
                            <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    clsx(
                                        'relative cursor-pointer select-none py-2 pl-10 pr-4',
                                        {
                                            'bg-blue-500 text-slate-300':
                                                active,
                                        },
                                    )
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate `}>
                                            {capitalizeFirstLetter(option)}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </li>
    );
}
