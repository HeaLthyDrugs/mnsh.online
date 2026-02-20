"use client";

import * as React from "react";
import { Settings, Volume2, VolumeX } from "lucide-react";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { isSoundEnabledAtom } from "@/store/sound-store";
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
    const { toggleTheme, isDark } = useAnimatedThemeToggle();

    const playHover = useSound("/sounds/hover.wav");
    const playTap = useSound("/sounds/tap.wav");

    const toggleSound = () => {
        setIsSoundEnabled((prev) => !prev);
    };

    return (
        <div className="fixed bottom-2 right-2 z-50 flex h-9 items-center overflow-hidden border bg-background/80 shadow-lg backdrop-blur-md transition-all hover:bg-background/90">
            <button
                onClick={() => {
                    playTap();
                    toggleSound();
                }}
                onMouseEnter={playHover}
                className={cn(
                    "flex h-full cursor-pointer items-center justify-center px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0",
                    !isSoundEnabled && "text-destructive hover:text-destructive"
                )}
                aria-label={!isSoundEnabled ? "Unmute" : "Mute"}
            >
                {!isSoundEnabled ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>

            <div className="h-full w-px bg-border" aria-hidden="true" />

            <FamilyDrawerRoot>
                <FamilyDrawerTrigger asChild>
                    <button
                        onMouseEnter={playHover}
                        onClick={playTap}
                        className="flex h-full cursor-pointer items-center justify-center px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0"
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
                                    value="false"
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
