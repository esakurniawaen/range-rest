import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
    width?: 'fit' | 'full';
}

export default function Button({
    children,
    width = 'fit',
    variant,
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={clsx('rounded-md border border-transparent py-3 px-4', {
                'bg-indigo-500': variant === 'primary',
                'border-slate-700': variant === 'secondary',
                'w-full': width === 'full',
            })}
            {...restProps}
        >
            {children}
        </button>
    );
}
