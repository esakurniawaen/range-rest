import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import  IconButton  from '../IconButton';

export default function Header() {
    return (
        <header className="flex px-2 items-center mb-4 md:mb-5 lg:mb-6 md:py-4 lg:py-5 py-3 shadow dark:shadow-lg justify-between">
            <h1 className="font-serif text-xl font-bold text-slate-300">
                Gaps Learning Timer
            </h1>
            <IconButton >
                <Cog8ToothIcon className='h-6 w-6' />
            </IconButton>
        </header>
    );
}
