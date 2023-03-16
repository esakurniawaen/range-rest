import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
}

export default function Button({
    children,
    variant,
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={clsx(
                'w-full rounded-md border border-transparent py-3 px-4',
                {
                    'bg-indigo-500': variant === 'primary',
                    'border-slate-700': variant === 'secondary',
                },
            )}
            {...restProps}
        >
            {children}
        </button>
    );
}
