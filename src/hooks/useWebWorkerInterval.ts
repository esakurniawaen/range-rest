import { useEffect, useRef } from 'react';
import { clearInterval, setInterval } from 'worker-timers';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

function useWebWorkerInterval(callback: () => void, delay: number | null) {
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

        // eslint-disable-next-line
        const id = setInterval(() => savedCallback.current(), delay);

        // eslint-disable-next-line
        return () => clearInterval(id);
    }, [delay]);
}

export default useWebWorkerInterval;
