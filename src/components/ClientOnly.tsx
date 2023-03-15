import { type ReactNode } from 'react';
import { useHasMounted } from '~/hooks';

type ClientOnlyProps = {
    children: ReactNode;
};

export default function ClientOnly({ children }: ClientOnlyProps) {
    const hasMounted = useHasMounted();

    if (!hasMounted) return null;

    return <>{children}</>;
}
