import { Popover } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

type ExtraInformationProps = {
    info: string;
};

export default function ExtraInformation({ info }: ExtraInformationProps) {
    return (
        <Popover className="relative">
            <Popover.Button className='block'>
                <QuestionMarkCircleIcon className="h-5 w-5" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 left-1/2 -translate-x-1/2 rounded p-2 dark:bg-slate-800 dark:shadow-lg">
                <p className='inline-block'>{info}</p>
            </Popover.Panel>
        </Popover>
    );
}
