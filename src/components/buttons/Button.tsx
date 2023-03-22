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
                'bg-blue-600 text-blue-100 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800':
                    variant === 'filled' && color === 'primary',
                'bg-green-600 text-green-100 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800':
                    variant === 'filled' && color === 'success',
                'bg-red-600 text-red-100 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800':
                    variant === 'filled' && color === 'error',
                'border-blue-500 text-blue-500 hover:border-blue-400 hover:text-blue-400  dark:border-blue-600 dark:text-blue-600 dark:hover:bg-blue-500 dark:hover:text-blue-500':
                    variant === 'outlined' && color === 'primary',
                'border-green-500 text-green-500 hover:border-green-400 hover:text-green-400 dark:border-green-600 dark:text-green-600 dark:hover:border-green-500 dark:hover:text-green-500':
                    variant === 'outlined' && color === 'success',
                'border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 dark:border-red-600 dark:text-red-600 dark:hover:border-red-500 dark:hover:text-red-500':
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
