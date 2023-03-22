import { type HTMLAttributes, type ReactElement } from 'react';
import clsx from 'clsx';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'icon';
    children: ReactElement;
}

export default function IconButton({ variant = 'icon', children, ...restProps }: IconButtonProps) {
    return (
        <button
            className={clsx(
                'rounded-lg p-2 transition active:scale-95 hover:text-slate-600 dark:hover:text-slate-300',
                {
                    'bg-slate-800 outline outline-1 outline-slate-700':
                        variant === 'filled',
                },
            )}
            {...restProps}
        >
            {children}
        </button>
    );
}
