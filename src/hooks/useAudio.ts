import { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export default function useAudio(url: `/audios/${string}`) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffectOnce(() => {
        setAudio(new Audio(url));
    });

    return audio;
}
