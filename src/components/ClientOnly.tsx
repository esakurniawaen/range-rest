import { useIsClient } from 'usehooks-ts';
import { type ElementType, type HTMLAttributes } from 'react';

interface ClientOnlyProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
}

export default function ClientOnly({
    children,
    as: Tag = 'div',
    ...restProps
}: ClientOnlyProps) {
    const isClient = useIsClient();

    if (!isClient) return null;

    return <Tag {...restProps}>{children}</Tag>;
}
