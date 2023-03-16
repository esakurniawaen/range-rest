import { type ReactElement } from 'react';
import clsx from 'clsx';

type IconButtonProps = {
    variant: 'solid' | 'outline';
    children: ReactElement;
};

export default function IconButton({
    variant,
    children,
}: IconButtonProps) {
    return (
        <button
            className={clsx(
                'rounded-lg p-2 transition active:scale-95 dark:hover:text-slate-300',
                {
                    'bg-slate-800 outline outline-1 outline-slate-700':
                        variant === 'solid',
                },
            )}
        >
            {children}
        </button>
    );
}
