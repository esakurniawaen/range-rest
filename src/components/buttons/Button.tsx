import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'outlined';
    width?: 'fit' | 'full';
    color?: 'primary' | 'success' | 'error';
    size?: 'small' | 'medium' | 'large';
}

export default function Button({
    children,
    variant = 'filled',
    width = 'fit',
    color = 'primary',
    size = 'medium',
    ...restProps
}: ButtonProps) {
    return (
        <button
            className={clsx('border font-semibold transition', {
                'border-transparent': variant === 'filled',
                ' text-blue-100 dark:bg-blue-700 dark:hover:bg-blue-800':
                    variant === 'filled' && color === 'primary',
                'text-green-100 dark:bg-green-700 dark:hover:bg-green-800':
                    variant === 'filled' && color === 'success',
                'text-red-100 dark:bg-red-700 dark:hover:bg-red-800':
                    variant === 'filled' && color === 'error',
                'dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-500 dark:hover:text-blue-500':
                    variant === 'outlined' && color === 'primary',
                'border-green-600 text-green-600 hover:border-green-500 hover:text-green-500':
                    variant === 'outlined' && color === 'success',
                'border-red-600 text-red-600 hover:border-red-500 hover:text-red-500':
                    variant === 'outlined' && color === 'error',
                'rounded py-2 px-3 text-sm': size === 'small',
                'rounded-md py-3 px-4': size === 'medium',
                'rounded-lg py-4 px-5 text-lg': size === 'large',
                'w-full': width === 'full',
            })}
            {...restProps}
        >
            {children}
        </button>
    );
}
