import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IconButton } from '../buttons';
import SettingsModal from './SettingsModal';

export default function Header() {
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    return (
        <>
            <header className="mb-6 flex items-center justify-between px-4 py-3 shadow dark:shadow-md  md:px-6 md:py-4 lg:px-8 lg:py-6">
                <h1
                    onClick={() => setSettingsOpen(true)}
                    className="font-serif text-xl font-bold text-slate-600 dark:text-slate-300"
                >
                    Gaps Learning Timer
                </h1>

                <IconButton
                    onClick={() => setSettingsOpen(true)}
                    variant="icon"
                >
                    <Cog8ToothIcon className="pointer-events-none h-6 w-6" />
                </IconButton>
            </header>

            <SettingsModal
                open={isSettingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </>
    );
}
