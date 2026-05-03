"use client";

import * as React from "react";
import { Settings, Volume2, VolumeX, Pause, Play, X } from "lucide-react";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";
import { cn } from "@/lib/utils";
import { isSoundEnabledAtom } from "@/store/sound-store";
import { isGalleryExpandedAtom, showLabelsAtom } from "@/store/ui-store";
import { isPlayingAtom, genreIdxAtom, currentTrackIdxAtom, shuffledGenresAtom } from "@/store/music-store";
import { GENRES } from "@/features/profile/data/music";
import { AudioLinesIcon, type AudioLinesIconHandle } from "@/components/animated-icons/audio-lines";
import { useSound } from "@/hooks/use-sound";
import { useAnimatedThemeToggle } from "@/hooks/use-animated-theme-toggle";

import {
    FamilyDrawerRoot,
    FamilyDrawerTrigger,
    FamilyDrawerContent,
    FamilyDrawerOverlay,
    FamilyDrawerPortal,
    FamilyDrawerHeader,
    FamilyDrawerAnimatedWrapper,
} from "@/components/ui/family-drawer";

export function FloatingControls() {
    const [isSoundEnabled, setIsSoundEnabled] = useAtom(isSoundEnabledAtom);
    const [isGalleryExpanded] = useAtom(isGalleryExpandedAtom);
    const [showLabels, setShowLabels] = useAtom(showLabelsAtom);
    const { toggleTheme, isDark } = useAnimatedThemeToggle();

    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
    const genreIdx = useAtomValue(genreIdxAtom);
    const currentTrack = useAtomValue(currentTrackIdxAtom);
    const [isPlayerExpanded, setIsPlayerExpanded] = React.useState(false);
    const [shuffledGenres] = useAtom(shuffledGenresAtom);

    const track = shuffledGenres[genreIdx]?.tracks[currentTrack];

    const audioLinesRef = React.useRef<AudioLinesIconHandle>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        if (isPlaying) {
            setIsVisible(true);
        }
    }, [isPlaying]);

    React.useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isPlaying) {
            audioLinesRef.current?.startAnimation();
            // A short delay guarantees Framer Motion elements are hydrated on initial mount
            timeout = setTimeout(() => audioLinesRef.current?.startAnimation(), 100);
        } else {
            audioLinesRef.current?.stopAnimation();
        }
        
        return () => clearTimeout(timeout);
    }, [isPlaying, track]);

    const playHover = useSound("/sounds/hover.wav");
    const playTap = useSound("/sounds/tap.wav");

    const toggleSound = () => {
        setIsSoundEnabled((prev) => !prev);
    };

    return (
        <div 
            className={cn(
                "fixed bottom-4 right-4 z-50 flex flex-col items-stretch overflow-hidden rounded-none border border-border/50 bg-background/60 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:bg-background/80 hover:border-border hover:shadow-primary/5",
                isGalleryExpanded && "opacity-0 pointer-events-none translate-y-4"
            )}
        >
            {isVisible && track && (
                <div 
                    className={cn(
                        "relative w-[81px] transition-all duration-300 ease-out overflow-hidden border-b border-border/50 bg-neutral-900 cursor-pointer group/player",
                        isPlayerExpanded ? "h-[81px]" : "h-6"
                    )}
                    onMouseEnter={() => {
                        playHover();
                        setIsPlayerExpanded(true);
                    }}
                    onMouseLeave={() => {
                        setIsPlayerExpanded(false);
                    }}
                    onClick={(e) => {
                        if (!isPlayerExpanded) {
                            playTap();
                            setIsPlayerExpanded(true);
                        }
                    }}
                    aria-label="Music Controls"
                >
                    <Image
                        src={track.cover}
                        alt={`${track.title} Cover`}
                        fill
                        className={cn(
                            "object-cover transition-all duration-700 ease-in-out",
                            isPlayerExpanded ? "opacity-80 scale-110" : "opacity-40 blur-[2px] brightness-75 scale-100"
                        )}
                    />
                    
                    {/* Unexpanded Content (AudioLines or Play) */}
                    <div 
                        className={cn(
                            "absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none",
                            isPlayerExpanded ? "opacity-0 scale-75" : "opacity-100 scale-100"
                        )}
                    >
                        {isPlaying ? (
                            <AudioLinesIcon ref={audioLinesRef} size={16} className="text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
                        ) : (
                            <Play className="size-3 text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" fill="currentColor" />
                        )}
                    </div>
                    
                    {/* Expanded Content (Play/Pause Button) */}
                    <div 
                        className={cn(
                            "absolute inset-0 flex items-center justify-center transition-all duration-500",
                            isPlayerExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                        )}
                    >
                        <div className="absolute inset-0 bg-black/10 group-hover/player:bg-black/20 transition-colors duration-500 pointer-events-none" />
                        <button 
                            className="relative z-10 flex size-full items-center justify-center outline-none focus-visible:ring-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isPlayerExpanded) {
                                    playTap();
                                    setIsPlaying(!isPlaying);
                                }
                            }}
                            aria-label={isPlaying ? "Pause Music" : "Play Music"}
                        >
                            <div className="flex size-10 items-center justify-center rounded-none bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-90">
                                {isPlaying ? (
                                    <Pause className="size-5 text-white" />
                                ) : (
                                    <Play className="size-5 text-white ml-1" fill="currentColor" />
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Close Button */}
                    <button
                        className={cn(
                            "absolute top-1.5 right-1.5 z-20 flex size-5 items-center justify-center rounded-none bg-black/40 hover:bg-black/60 text-white/70 hover:text-white backdrop-blur-md transition-all duration-300 ease-out",
                            isPlayerExpanded ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            playTap();
                            setIsPlaying(false);
                            setIsVisible(false);
                            setIsPlayerExpanded(false);
                        }}
                        aria-label="Remove Mini Player"
                    >
                        <X className="size-3" />
                    </button>
                </div>
            )}
            
            <div className="flex h-10 items-stretch w-[81px]">
                <button
                    onClick={() => {
                        playTap();
                        toggleSound();
                    }}
                    onMouseEnter={playHover}
                    className={cn(
                        "flex flex-1 cursor-pointer items-center justify-center text-muted-foreground/70 transition-all duration-300 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0",
                        !isSoundEnabled && "text-destructive/80 hover:text-destructive hover:bg-destructive/5"
                    )}
                    aria-label={!isSoundEnabled ? "Unmute" : "Mute"}
                >
                    {!isSoundEnabled ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>

                <div className="w-px bg-border/40" aria-hidden="true" />

                <FamilyDrawerRoot>
                    <FamilyDrawerTrigger asChild>
                        <button
                            onMouseEnter={playHover}
                            onClick={playTap}
                            className="flex flex-1 cursor-pointer items-center justify-center text-muted-foreground/70 transition-all duration-300 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0"
                            aria-label="Open Settings"
                        >
                            <Settings className="size-4" />
                        </button>
                    </FamilyDrawerTrigger>
                    <FamilyDrawerPortal>
                        <FamilyDrawerOverlay />
                        <FamilyDrawerContent>
                            <FamilyDrawerAnimatedWrapper className="p-0">
                                <FamilyDrawerHeader
                                    icon={null}
                                    title=""
                                    description=""
                                    className="mt-0 hidden"
                                />
                                <div className="flex flex-col gap-0">
                                    <SettingItem
                                        label="Show Labels"
                                        value={showLabels ? "enabled" : "disabled"}
                                        isActive={showLabels}
                                        onClick={() => {
                                            playTap();
                                            setShowLabels(!showLabels);
                                        }}
                                        onMouseEnter={playHover}
                                    />
                                    <SettingItem
                                        label="Theme"
                                        value={isDark ? "dark" : "light"}
                                        isActive
                                        onClick={() => {
                                            playTap();
                                            toggleTheme();
                                        }}
                                        onMouseEnter={playHover}
                                    />
                                    <SettingItem
                                        label="Sound"
                                        value={isSoundEnabled ? "enabled" : "disabled"}
                                        onClick={() => {
                                            playTap();
                                            toggleSound();
                                        }}
                                        onMouseEnter={playHover}
                                    />
                                </div>
                            </FamilyDrawerAnimatedWrapper>
                        </FamilyDrawerContent>
                    </FamilyDrawerPortal>
                </FamilyDrawerRoot>
            </div>
        </div>
    );
}

interface SettingItemProps {
    label: string;
    value: string;
    isActive?: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
}

function SettingItem({ label, value, isActive, onClick, onMouseEnter }: SettingItemProps) {
    return (
        <div
            className={cn(
                "group flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-sm transition-colors hover:bg-muted/50 px-4 select-none rounded-none",
                isActive && "bg-background shadow-none" // Removed ring/border, just keeping bg
            )}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            <span className="font-serif text-muted-foreground group-hover:text-foreground">{label}</span>
            <div className="h-px flex-1 bg-border/40 group-hover:bg-border/60" />
            <span className={cn("text-muted-foreground", isActive && "text-foreground font-medium")}>{value}</span>
        </div>
    );
}
