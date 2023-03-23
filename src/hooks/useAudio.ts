import { useEffect, useState } from 'react';

export default function useAudio(url: `/audios/${string}`) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        setAudio(new Audio(url));
        console.log(audio);
    }, [url]);

    return audio;
}
