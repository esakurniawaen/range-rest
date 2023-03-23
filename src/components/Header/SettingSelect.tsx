import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Theme } from "~/types";
import { capitalizeFirstWord } from "~/utils";

type SettingSelectProps<T> = {
    label: string;
    options: T[];
    selectedOption: T;
    onSelectedOptionChange: (option: T) => void;
};

export default function SettingSelect<T extends Theme | string>({
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
                    <Listbox.Button className="rounded border border-slate-300 py-1 px-2 dark:border-slate-700">
                        {capitalizeFirstWord(
                            selectedOption.replaceAll('-', ' '),
                        )}
                    </Listbox.Button>

                    <Listbox.Options className="absolute left-1/2 z-10 mt-1 -translate-x-1/2 divide-y divide-slate-400 rounded bg-slate-300 py-1 shadow dark:divide-slate-600 dark:bg-slate-700 dark:shadow-md">
                        {options.map((option, optionIdx) => (
                            <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    clsx(
                                        'relative cursor-pointer select-none py-2 pl-10 pr-4',
                                        {
                                            'bg-blue-400 text-slate-200 dark:bg-blue-500 dark:text-slate-300':
                                                active,
                                        },
                                    )
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate `}>
                                            {capitalizeFirstWord(
                                                option.replaceAll('-', ' '),
                                            )}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                                                <CheckIcon
                                                    className="h-5 w-5 text-blue-500 dark:text-blue-600"
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
