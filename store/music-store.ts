import { atom } from 'jotai';
import { createRef } from 'react';

export const genreIdxAtom = atom(0);
export const currentTrackIdxAtom = atom(0);
export const isPlayingAtom = atom(false);
export const currentTimeAtom = atom(0);
export const durationAtom = atom(0);
export const volumeAtom = atom(1);
export const isMusicMutedAtom = atom(false);

// A reference to the global HTMLAudioElement for direct time manipulation
export const globalAudioRef = createRef<HTMLAudioElement>();
