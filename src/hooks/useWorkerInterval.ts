import { useEffect, useRef } from 'react';
import {
    clearInterval as clearWorkerInterval,
    setInterval as setWorkerInterval,
} from 'worker-timers';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

function useWorkerInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return;
        }

        const id = setWorkerInterval(() => savedCallback.current(), delay);

        return () => clearWorkerInterval(id);
    }, [delay]);
}

export default useWorkerInterval;
