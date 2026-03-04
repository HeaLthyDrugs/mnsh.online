// ─── Genre & Track Definitions ─────────────────────────────────────

import { Waves, Zap, Coffee } from "lucide-react";

export interface Track {
    title: string;
    artist: string;
    cover: string;
    // audioSrc can be an external URL (e.g., "https://...") 
    // or a local path to a file in the public folder (e.g., "/music/song.mp3")
    // Supports various formats: .mp3, .wav, .ogg, etc.
    audioSrc: string;
}

export interface Genre {
    label: string;
    icon: any;
    tracks: Track[];
}

export const GENRES: Genre[] = [
    {
        label: "Ambient",
        icon: Waves,
        tracks: [
            {
                title: "Midnight Waves",
                artist: "Ambient Drift",
                cover: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Example external URL
            },
            {
                title: "Forest Rain",
                artist: "Nature Sound Co.",
                cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            },
            {
                title: "Deep Focus",
                artist: "Lo-Fi Studio",
                cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            },
        ],
    },
    {
        label: "Synthwave",
        icon: Zap,
        tracks: [
            {
                title: "Neon Pulse",
                artist: "Synthwave Collective",
                cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            },
            {
                title: "Retro Drive",
                artist: "Night Runner",
                cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            },
            {
                title: "Chrome Dreams",
                artist: "Signal Wave",
                cover: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            },
        ],
    },
    {
        label: "Lo-Fi",
        icon: Coffee,
        tracks: [
            {
                title: "Late Night Study",
                artist: "Chill Beats",
                cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            },
            {
                title: "Sunday Morning",
                artist: "Vinyl Café",
                cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            },
            {
                title: "Warm Tape",
                artist: "Analog Mood",
                cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80",
                audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            },
        ],
    },
];
