"use client";

import { useEffect, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { 
    genreIdxAtom, 
    currentTrackIdxAtom, 
    isPlayingAtom, 
    currentTimeAtom, 
    durationAtom, 
    volumeAtom, 
    isMusicMutedAtom,
    globalAudioRef 
} from "@/store/music-store";
import { isSoundEnabledAtom } from "@/store/sound-store";
import { GENRES } from "@/features/profile/data/music";

export function GlobalAudio() {
    const genreIdx = useAtomValue(genreIdxAtom);
    const [currentTrack, setCurrentTrack] = useAtom(currentTrackIdxAtom);
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
    
    const [, setCurrentTime] = useAtom(currentTimeAtom);
    const [, setDuration] = useAtom(durationAtom);
    
    const volume = useAtomValue(volumeAtom);
    const isMusicMuted = useAtomValue(isMusicMutedAtom);
    const isSoundEnabled = useAtomValue(isSoundEnabledAtom);

    const track = GENRES[genreIdx]?.tracks[currentTrack];

    useEffect(() => {
        const audio = globalAudioRef.current;
        if (!audio) return;
        
        audio.muted = isMusicMuted || !isSoundEnabled;
        audio.volume = volume;
    }, [isMusicMuted, isSoundEnabled, volume]);

    useEffect(() => {
        const audio = globalAudioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(console.error);
        } else {
            audio.pause();
        }
    }, [isPlaying, track]);

    const handleTimeUpdate = useCallback(() => {
        if (globalAudioRef.current) {
            setCurrentTime(globalAudioRef.current.currentTime);
        }
    }, [setCurrentTime]);

    const handleLoadedMetadata = useCallback(() => {
        if (globalAudioRef.current) {
            setDuration(globalAudioRef.current.duration);
        }
    }, [setDuration]);

    const handleAudioEnded = useCallback(() => {
        const currentGenre = GENRES[genreIdx];
        if (!currentGenre) return;
        setCurrentTrack((p) => (p + 1) % currentGenre.tracks.length);
    }, [genreIdx, setCurrentTrack]);

    if (!track) return null;

    return (
        <audio
            ref={globalAudioRef}
            src={track.audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnded}
            style={{ display: "none" }}
        />
    );
}
