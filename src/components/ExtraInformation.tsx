import { Popover } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type ExtraInformationProps = {
    info: string;
};

export default function ExtraInformation({ info }: ExtraInformationProps) {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={clsx('block rounded border outline-none', {
                            'border-blue-500 text-slate-600 dark:border-blue-400 dark:text-slate-300':
                                open,
                            'border-transparent': !open,
                        })}
                    >
                        <QuestionMarkCircleIcon className="h-5 w-5" />
                    </Popover.Button>

                    <Popover.Overlay className="fixed inset-0 z-30 bg-white/30 dark:bg-black/30" />

                    <Popover.Panel className="absolute left-1/2 z-40 mt-1 -translate-x-1/2  transform rounded bg-slate-100 p-2 shadow dark:bg-slate-800 dark:shadow-md">
                        <span className="block w-24">
                            {info}
                        </span>
                    </Popover.Panel>
                </>
            )}
        </Popover>
    );
}
