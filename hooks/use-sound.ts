import { useCallback, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { isSoundEnabledAtom } from "@/store/sound-store";

// Global cache for audio buffers to avoid redundant fetches and decoding
const bufferCache = new Map<string, AudioBuffer>();
// Global audio context shared across all hook instances to avoid hitting browser limits
let sharedAudioCtx: AudioContext | null = null;

function getSharedAudioContext() {
    if (typeof window === "undefined") return null;
    if (!sharedAudioCtx) {
        const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (AudioContextClass) {
            sharedAudioCtx = new AudioContextClass();
        }
    }
    return sharedAudioCtx;
}

/**
 * Custom React hook to load and play a sound from a given URL using a shared Web Audio API context.
 */
export function useSound(url: string) {
    const isSoundEnabled = useAtomValue(isSoundEnabledAtom);
    const bufferRef = useRef<AudioBuffer | null>(bufferCache.get(url) || null);

    useEffect(() => {
        // If already in cache, no need to fetch
        if (bufferCache.has(url)) {
            bufferRef.current = bufferCache.get(url)!;
            return;
        }

        const audioCtx = getSharedAudioContext();
        if (!audioCtx) return;

        let isMounted = true;

        fetch(url)
            .then((res) => res.arrayBuffer())
            .then((data) => audioCtx.decodeAudioData(data))
            .then((decoded) => {
                if (isMounted) {
                    bufferCache.set(url, decoded);
                    bufferRef.current = decoded;
                }
            })
            .catch((err) => {
                console.warn(`Failed to load sound from ${url}:`, err);
            });

        return () => {
            isMounted = false;
        };
    }, [url]);

    const play = useCallback(() => {
        if (!isSoundEnabled) return;

        const audioCtx = getSharedAudioContext();
        if (audioCtx && bufferRef.current) {
            // Resume context if suspended (browser autoplay policy)
            if (audioCtx.state === "suspended") {
                audioCtx.resume();
            }

            const source = audioCtx.createBufferSource();
            source.buffer = bufferRef.current;
            source.connect(audioCtx.destination);
            source.start(0);
        }
    }, [isSoundEnabled]);

    return play;
}