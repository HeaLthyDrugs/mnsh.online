"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
    Play,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Disc3,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    AudioLinesIcon,
    type AudioLinesIconHandle,
} from "@/components/animated-icons/audio-lines";

// ─── Genre definitions ───────────────────────────────────────────
interface Track {
    title: string;
    artist: string;
    cover: string;
}

interface Genre {
    label: string;
    icon: string;
    tracks: Track[];
}

const GENRES: Genre[] = [
    {
        label: "Ambient",
        icon: "🌊",
        tracks: [
            {
                title: "Midnight Waves",
                artist: "Ambient Drift",
                cover: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
            },
            {
                title: "Forest Rain",
                artist: "Nature Sound Co.",
                cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
            },
            {
                title: "Deep Focus",
                artist: "Lo-Fi Studio",
                cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
            },
        ],
    },
    {
        label: "Synthwave",
        icon: "⚡",
        tracks: [
            {
                title: "Neon Pulse",
                artist: "Synthwave Collective",
                cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&q=80",
            },
            {
                title: "Retro Drive",
                artist: "Night Runner",
                cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80",
            },
            {
                title: "Chrome Dreams",
                artist: "Signal Wave",
                cover: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80",
            },
        ],
    },
    {
        label: "Lo-Fi",
        icon: "☕",
        tracks: [
            {
                title: "Late Night Study",
                artist: "Chill Beats",
                cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
            },
            {
                title: "Sunday Morning",
                artist: "Vinyl Café",
                cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&q=80",
            },
            {
                title: "Warm Tape",
                artist: "Analog Mood",
                cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80",
            },
        ],
    },
];

// Glass style shared across buttons
const GLASS =
    "backdrop-blur-md bg-white/10 border border-white/15 hover:bg-white/20 active:scale-95 transition-all duration-300";

// ─── Component ───────────────────────────────────────────────────
export function MusicPlayer({ className }: { className?: string }) {
    const [genreIdx, setGenreIdx] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [genreOpen, setGenreOpen] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioLinesRef = useRef<AudioLinesIconHandle>(null);

    const genre = GENRES[genreIdx];
    const track = genre.tracks[currentTrack];

    // Control AudioLines animation based on play state
    useEffect(() => {
        if (isPlaying) {
            audioLinesRef.current?.startAnimation();
        } else {
            audioLinesRef.current?.stopAnimation();
        }
    }, [isPlaying]);

    // Simulate playback
    useEffect(() => {
        if (isPlaying) {
            progressInterval.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        handleNext();
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 150);
        } else if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [isPlaying, currentTrack, genreIdx]);

    const handlePlayPause = useCallback(() => setIsPlaying((p) => !p), []);

    const handleNext = useCallback(() => {
        setCurrentTrack((p) => (p + 1) % genre.tracks.length);
        setProgress(0);
        setImgLoaded(false);
    }, [genre.tracks.length]);

    const handlePrev = useCallback(() => {
        setCurrentTrack((p) => (p - 1 + genre.tracks.length) % genre.tracks.length);
        setProgress(0);
        setImgLoaded(false);
    }, [genre.tracks.length]);

    const handleGenreChange = useCallback((idx: number) => {
        setGenreIdx(idx);
        setCurrentTrack(0);
        setProgress(0);
        setGenreOpen(false);
        setImgLoaded(false);
    }, []);

    const handleProgressClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(Math.max(0, Math.min(100, pct)));
        },
        []
    );

    const formatTime = (pct: number) => {
        const s = Math.floor((pct / 100) * 210);
        return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
    };

    return (
        <div
            className={cn(
                "group/player relative h-full w-full overflow-hidden select-none",
                "border border-edge",
                className
            )}
        >
            {/* ── Album Art — fills the ENTIRE card ───────────── */}
            <Image
                key={`${genreIdx}-${currentTrack}`}
                src={track.cover}
                alt={track.title}
                fill
                className={cn(
                    "object-cover transition-all duration-700 ease-out",
                    "group-hover/player:scale-105",
                    imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                )}
                onLoad={() => setImgLoaded(true)}
                unoptimized
            />

            {/* Track indicator dots — top */}
            <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                {genre.tracks.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setCurrentTrack(i);
                            setProgress(0);
                            setImgLoaded(false);
                        }}
                        className={cn(
                            "h-1 bg-white transition-all duration-500 ease-out",
                            i === currentTrack
                                ? "w-5 opacity-90"
                                : "w-1.5 opacity-30 hover:opacity-60"
                        )}
                    />
                ))}
            </div>



            {/* ── Progressive blur overlay — bottom ───────────── */}
            <div
                className="absolute inset-x-0 bottom-0 h-[70%] z-10 pointer-events-none"
                style={{
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",
                    maskImage: "linear-gradient(to top, black 0%, transparent 60%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 60%)",
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-[55%] z-10 pointer-events-none"
                style={{
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-[45%] z-10 pointer-events-none"
                style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-[50%] z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                }}
            />

            {/* ── Controls — overlaid at bottom ───────────────── */}
            <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-3.5 pt-6 flex flex-col gap-2.5">
                {/* Track Info */}
                <div className="space-y-0.5 overflow-hidden">
                    <h4
                        key={`title-${genreIdx}-${currentTrack}`}
                        className={cn(
                            "text-white text-sm font-medium truncate leading-tight drop-shadow-sm",
                            "animate-[slideUp_0.35s_ease-out]"
                        )}
                    >
                        {track.title}
                    </h4>
                    <p
                        key={`artist-${genreIdx}-${currentTrack}`}
                        className={cn(
                            "text-white/55 text-xs truncate drop-shadow-sm",
                            "animate-[slideUp_0.4s_ease-out]"
                        )}
                    >
                        {track.artist}
                    </p>
                </div>

                {/* Progress / Seek Bar — glass effect */}
                <div className="space-y-1">
                    <div
                        className={cn(
                            "w-full h-[5px] cursor-pointer group/progress relative overflow-hidden",
                            "bg-white/10 backdrop-blur-sm border border-white/10"
                        )}
                        onClick={handleProgressClick}
                    >
                        {/* Glow behind fill */}
                        <div
                            className="absolute h-full opacity-40 blur-[4px] bg-white"
                            style={{ width: `${progress}%` }}
                        />
                        {/* Fill */}
                        <div
                            className="h-full relative transition-[width] duration-100 ease-linear bg-white/80"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Scrubber */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white opacity-0 group-hover/progress:opacity-100 transition-all duration-200 scale-0 group-hover/progress:scale-100 shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                        </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/30 font-mono tabular-nums">
                        <span>{formatTime(progress)}</span>
                        <span>3:30</span>
                    </div>
                </div>

                {/* Transport Controls — all glass */}
                <div className="flex items-center justify-between">
                    {/* Volume — glass icon */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={cn(
                            "flex items-center justify-center size-8 text-white/70",
                            GLASS
                        )}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <VolumeX className="size-3.5" />
                        ) : (
                            <Volume2 className="size-3.5" />
                        )}
                    </button>

                    {/* Center transport */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            className="text-white/60 hover:text-white transition-all duration-300 active:scale-90"
                            aria-label="Previous track"
                        >
                            <SkipBack className="size-4" fill="currentColor" />
                        </button>

                        {/* Play / Pause — glass */}
                        <button
                            onClick={handlePlayPause}
                            className={cn(
                                "relative flex items-center justify-center",
                                "w-10 h-10 text-white",
                                GLASS
                            )}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {/* AudioLines — always mounted, toggled via opacity */}
                            <span
                                className={cn(
                                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                    isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                )}
                            >
                                <AudioLinesIcon ref={audioLinesRef} size={18} />
                            </span>
                            {/* Play icon */}
                            <span
                                className={cn(
                                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                    isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100"
                                )}
                            >
                                <Play className="size-4 ml-0.5" fill="currentColor" />
                            </span>
                        </button>

                        <button
                            onClick={handleNext}
                            className="text-white/60 hover:text-white transition-all duration-300 active:scale-90"
                            aria-label="Next track"
                        >
                            <SkipForward className="size-4" fill="currentColor" />
                        </button>
                    </div>

                    {/* Genre — glass icon button with dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setGenreOpen((p) => !p)}
                            className={cn(
                                "flex items-center justify-center size-8 text-white/70",
                                GLASS
                            )}
                            aria-label="Change genre"
                        >
                            <Disc3
                                className={cn(
                                    "size-3.5 transition-transform duration-700",
                                    isPlaying && "animate-[spin_3s_linear_infinite]"
                                )}
                            />
                        </button>

                        {/* Genre dropdown — opens upward */}
                        <div
                            className={cn(
                                "absolute bottom-full right-0 mb-1.5 min-w-[110px] overflow-hidden",
                                "backdrop-blur-xl bg-black/60 border border-white/10",
                                "transition-all duration-300 origin-bottom-right",
                                genreOpen
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 translate-y-1 pointer-events-none"
                            )}
                        >
                            {GENRES.map((g, i) => (
                                <button
                                    key={g.label}
                                    onClick={() => handleGenreChange(i)}
                                    className={cn(
                                        "flex items-center gap-2 w-full px-3 py-2 text-left text-xs",
                                        "transition-all duration-200",
                                        i === genreIdx
                                            ? "text-white bg-white/10"
                                            : "text-white/50 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <span className="text-[11px]">{g.icon}</span>
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Inner ring */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 ring-inset z-30" />

            {/* ── Inline keyframes ────────────────────────────── */}
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
