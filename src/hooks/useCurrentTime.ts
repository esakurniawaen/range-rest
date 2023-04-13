import { useState } from 'react';
import useWorkerInterval from './useWorkerInterval';

type Time = `${string}:${string}:${string}`;

export default function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const time: Time = `${hours}:${minutes}:${seconds}`;
        return time;
    }

    function updateCurrentTime() {
        const time = getCurrentTime();
        setCurrentTime(time);
    }

    useWorkerInterval(updateCurrentTime, 1000);

    return currentTime;
}
