import { useEffect, useRef } from 'react';
import {
    setTimeout as setWorkerTimeout,
    clearTimeout as clearWorkerTimeout,
} from 'worker-timers';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

function useWorkerTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the timeout.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return;
        }

        const id = setWorkerTimeout(() => savedCallback.current(), delay);

        return () => clearWorkerTimeout(id);
    }, [delay]);
}

export default useWorkerTimeout;
