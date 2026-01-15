"use client";

import * as React from "react";
import { Settings, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import {
    FamilyDrawerRoot,
    FamilyDrawerTrigger,
    FamilyDrawerContent,
    FamilyDrawerOverlay,
    FamilyDrawerPortal,
    FamilyDrawerHeader,
    FamilyDrawerAnimatedWrapper,
    FamilyDrawerClose,
} from "@/components/ui/family-drawer";

export function FloatingControls() {
    const [isMuted, setIsMuted] = React.useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
        // TODO: Implement actual audio toggling logic here
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <div className="fixed bottom-2 right-2 z-50 flex h-9 items-center overflow-hidden border bg-background/80 shadow-lg backdrop-blur-md transition-all hover:bg-background/90">
            <button
                onClick={toggleMute}
                className={cn(
                    "flex h-full cursor-pointer items-center justify-center px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0",
                    isMuted && "text-destructive hover:text-destructive"
                )}
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>

            <div className="h-full w-px bg-border" aria-hidden="true" />

            <FamilyDrawerRoot>
                <FamilyDrawerTrigger asChild>
                    <button
                        className="flex h-full cursor-pointer items-center justify-center px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0"
                        aria-label="Open Settings"
                    >
                        <Settings className="size-4" />
                    </button>
                </FamilyDrawerTrigger>
                <FamilyDrawerPortal>
                    <FamilyDrawerOverlay />
                    <FamilyDrawerContent>
                        <FamilyDrawerAnimatedWrapper className="p-4">
                            <FamilyDrawerHeader
                                icon={null}
                                title=""
                                description=""
                                className="mt-0 hidden"
                            />
                            <div className="flex flex-col gap-1">
                                <SettingItem
                                    label="PRELOADER"
                                    value="false"
                                />
                                <SettingItem
                                    label="SHOW LABELS"
                                    value="false"
                                />
                                <SettingItem
                                    label="THEME"
                                    value={resolvedTheme === "dark" ? "dark" : "light"}
                                    isActive
                                    onClick={toggleTheme}
                                />
                                <SettingItem
                                    label="SYSTEM THEME"
                                    value="off"
                                />
                                <SettingItem
                                    label="SOUND"
                                    value={isMuted ? "disabled" : "enabled"}
                                    onClick={toggleMute}
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
}

function SettingItem({ label, value, isActive, onClick }: SettingItemProps) {
    return (
        <div
            className={cn(
                "group flex w-full cursor-pointer items-center justify-between gap-4 py-2.5 text-sm transition-colors hover:bg-muted/50 px-3 select-none rounded-none",
                isActive && "bg-background shadow-none" // Removed ring/border, just keeping bg
            )}
            onClick={onClick}
        >
            <span className="font-serif text-muted-foreground group-hover:text-foreground">{label}</span>
            <div className="h-px flex-1 bg-border/40 group-hover:bg-border/60" />
            <span className={cn("text-muted-foreground", isActive && "text-foreground font-medium")}>{value}</span>
        </div>
    );
}
