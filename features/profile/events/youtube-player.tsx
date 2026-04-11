"use client";

import { useState, useEffect, useRef, useId, useMemo } from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export function YoutubePlaylistPlayer({
    videoIds,
    className
}: {
    videoIds: string[],
    className?: string
}) {
    const rawId = useId();
    const playerId = `yt-player-${rawId.replace(/:/g, "")}`;
    const playerRef = useRef<any>(null);

    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);

    // Shuffle video IDs once on mount
    const shuffledVideoIds = useMemo(() => {
        const shuffled = [...videoIds];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [videoIds]);

    // Keep track of latest values for YT event callbacks
    const currentIndexRef = useRef(currentIndex);
    const videoIdsRef = useRef(shuffledVideoIds);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        videoIdsRef.current = shuffledVideoIds;
    }, [shuffledVideoIds]);

    useEffect(() => {
        if (!shuffledVideoIds || shuffledVideoIds.length === 0) return;

        const loadYT = () => {
            if (window.YT && window.YT.Player) {
                initPlayer();
            } else {
                if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                    const script = document.createElement('script');
                    script.src = "https://www.youtube.com/iframe_api";
                    document.body.appendChild(script);
                }

                const oldReady = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    if (oldReady) oldReady();
                    initPlayer();
                };
            }
        };

        const initPlayer = () => {
            const playerElement = document.getElementById(playerId);
            if (!playerElement) return;

            playerRef.current = new window.YT.Player(playerId, {
                videoId: shuffledVideoIds[0],
                playerVars: {
                    autoplay: 0,
                    mute: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    disablekb: 1,
                    iv_load_policy: 3
                },
                events: {
                    onReady: (event: any) => {
                        setIsReady(true);
                    },
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                            setHasStarted(true);
                            setIsSwitching(false);
                        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false);
                        } else if (event.data === window.YT.PlayerState.BUFFERING) {
                            // Keep overlay hidden during switches or small buffers
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            const next = (currentIndexRef.current + 1) % videoIdsRef.current.length;
                            setCurrentIndex(next);
                            event.target.loadVideoById(videoIdsRef.current[next]);
                        }
                    }
                }
            });
        };

        loadYT();

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, []);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        const next = (currentIndex + 1) % shuffledVideoIds.length;
        setCurrentIndex(next);
        setIsPlaying(false);
        setIsSwitching(true);
        playerRef.current.loadVideoById(shuffledVideoIds[next]);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        const prev = currentIndex === 0 ? shuffledVideoIds.length - 1 : currentIndex - 1;
        setCurrentIndex(prev);
        setIsPlaying(false);
        setIsSwitching(true);
        playerRef.current.loadVideoById(shuffledVideoIds[prev]);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!playerRef.current) return;
        if (isMuted) {
            playerRef.current.unMute();
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHasStarted(true);
        if (playerRef.current) {
            playerRef.current.playVideo();
            playerRef.current.unMute();
            setIsMuted(false);
        }
    };

    return (
        <div className={cn("relative w-full h-full bg-black overflow-hidden", className)}>

            {/* YouTube Iframe Wrapper */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
                <div className="w-[105%] h-[105%] relative pointer-events-none">
                    <div id={playerId} className="absolute inset-0 w-full h-full border-0 outline-none" />
                </div>
            </div>

            {/* Invisible Click/Hover Shield */}
            <div
                className="absolute inset-0 z-10 bg-transparent pointer-events-auto cursor-pointer"
                onClick={() => hasStarted && togglePlay()}
            />

            {/* Hover UI overlay */}
            <div className="absolute inset-0 z-30 pointer-events-none p-2 flex flex-col justify-between">

                {/* Top bar logic */}
                <div className="flex justify-end opacity-0 group-hover/event:opacity-100 transition-opacity duration-300">
                    <span className="backdrop-blur-sm bg-black/40 text-white/90 text-xs font-mono px-2 py-1 rounded-none border border-white/10 uppercase tracking-widest shadow-lg">
                        {currentIndex + 1} / {shuffledVideoIds.length}
                    </span>
                </div>

                {/* Center controls (Prev/Next) */}
                <div className="flex items-center justify-between opacity-0 group-hover/event:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <button
                        onClick={handlePrev}
                        className="bg-black/40 backdrop-blur-md rounded-none p-2 border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg hidden md:block"
                    >
                        <ChevronLeft className="size-5" />
                    </button>

                    <div />

                    <button
                        onClick={handleNext}
                        className="bg-black/40 backdrop-blur-md rounded-none p-2 border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg hidden md:block"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center opacity-0 group-hover/event:opacity-100 transition-opacity duration-300 pointer-events-auto w-full">
                    <button
                        onClick={handlePrev}
                        className="bg-black/40 backdrop-blur-md rounded-none p-2 border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg md:hidden mr-3 shrink-0"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="bg-black/40 backdrop-blur-md rounded-none p-2 md:p-3 border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg mr-3 shrink-0"
                    >
                        {isPlaying ? <Pause className="size-4 md:size-5" /> : <Play className="size-4 md:size-5" />}
                    </button>

                    <button
                        onClick={toggleMute}
                        className="ml-auto bg-black/40 backdrop-blur-md rounded-none p-2 md:p-3 border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg shrink-0"
                    >
                        {isMuted ? (
                            <VolumeX className="size-4 md:size-5" />
                        ) : (
                            <Volume2 className="size-4 md:size-5" />
                        )}
                    </button>

                    <button
                        onClick={handleNext}
                        className="ml-2 bg-black/40 backdrop-blur-md rounded-none p-2 border border-white/10 text-white hover:bg-white/20 transition-all shadow-lg md:hidden shrink-0"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>

            </div>

            {/* Initial & Pause Blur Overlay */}
            <div
                className={cn(
                    "absolute inset-0 z-[40] bg-black/40 backdrop-blur-md transition-all duration-700 flex items-end justify-end p-8",
                    (isPlaying || isSwitching) ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 pointer-events-auto translate-y-0"
                )}
                onClick={togglePlay}
            >
                <div className="flex flex-col items-end gap-6 cursor-pointer group">
                    <div className="transition-all duration-500 group-hover:scale-110 group-hover:translate-x-[-4px]">
                        <Play className="size-12 md:size-16 fill-white text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                    </div>
                    <div className="text-right space-y-2">
                        <p className="text-white/60 font-mono text-[9px] uppercase tracking-[.2em] leading-relaxed drop-shadow-md">
                            Youtube videos which I like
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
