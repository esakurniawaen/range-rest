import { type HTMLAttributes, type ReactElement } from 'react';
import clsx from 'clsx';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'icon';
    children: ReactElement;
}

export default function IconButton({
    variant = 'icon',
    children,
    ...restProps
}: IconButtonProps) {
    return (
        <button
            className={clsx(
                'rounded-full border p-2 transition hover:text-slate-600 active:scale-95 dark:hover:text-slate-300',
                {
                    'border-slate-700 bg-slate-800': variant === 'filled',
                    'border-transparent': variant === 'icon',
                },
            )}
            {...restProps}
        >
            {children}
        </button>
    );
}
