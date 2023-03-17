import { type ReactNode } from 'react';
import { useMountedState } from 'react-use';

type ClientOnlyProps = {
    children: ReactNode;
};

export default function ClientOnly({ children }: ClientOnlyProps) {
    const hasMounted = useMountedState();

    if (!hasMounted) return null;

    return <>{children}</>;
}
