"use client";

import { Panel } from "../components/panel";
import { EVENTS } from "../data/events";
import { EventItem } from "./event-item";
import { MusicPlayer } from "./music-player";
import { cn } from "@/lib/utils";

// Map sizes to CSS grid classes for responsive bento layout
// Mobile: 2 cols, Tablet: 4 cols, Desktop: 6 cols
const sizeToGridClasses: Record<string, string> = {
    // xs: 1 col on all screens
    xs: "col-span-1 row-span-1",
    // small: 1 col on all screens
    small: "col-span-1 row-span-1",
    // medium: 1 col mobile, 2 cols tablet+
    medium: "col-span-1 md:col-span-2 row-span-1",
    // large: 2 cols mobile, 2 cols tablet, 3 cols desktop
    large: "col-span-2 lg:col-span-3 row-span-1",
    // wide: full width on all screens
    wide: "col-span-2 md:col-span-4 lg:col-span-6 row-span-1",
    // tall: 1 col mobile, 2 cols tablet+, 2 rows
    tall: "col-span-1 md:col-span-2 row-span-2",
    // xl: 2 cols mobile, 2 cols tablet, 3 cols desktop, 2 rows
    xl: "col-span-2 md:col-span-2 lg:col-span-3 row-span-2",
};

// Music player grid placement — portrait tall card
const MUSIC_PLAYER_CLASSES = "col-span-1 md:col-span-2 row-span-2";

// Index in the events array where we insert the music player
const MUSIC_PLAYER_POSITION = 5;

export default function Events() {
    return (
        <Panel id="events">

            <div className="w-full p-1">
                {/* 
                    Responsive Bento Grid:
                    - Mobile: 2 columns
                    - Tablet (md): 4 columns
                    - Desktop (lg): 6 columns
                    - Dense packing to eliminate gaps
                */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 auto-rows-[200px] grid-flow-dense"
                    style={{ gridAutoFlow: "dense" }}
                >
                    {EVENTS.map((event, index) => {
                        const size = event.size || "medium";
                        const gridClasses = sizeToGridClasses[size] || sizeToGridClasses.medium;

                        // Staggered animation delay (max 600ms to keep it snappy)
                        const delay = Math.min(index * 50, 600);

                        const items = [];

                        // Insert music player at the designated position
                        if (index === MUSIC_PLAYER_POSITION) {
                            items.push(
                                <div
                                    key="music-player"
                                    className={cn(
                                        "overflow-hidden",
                                        "animate-[fadeSlideUp_0.5s_ease-out_forwards]",
                                        "opacity-0",
                                        MUSIC_PLAYER_CLASSES
                                    )}
                                    style={{
                                        animationDelay: `${delay}ms`,
                                    }}
                                >
                                    <MusicPlayer className="h-full" />
                                </div>
                            );
                        }

                        items.push(
                            <div
                                key={event.id}
                                className={cn(
                                    "bg-card overflow-hidden",
                                    "animate-[fadeSlideUp_0.5s_ease-out_forwards]",
                                    "opacity-0",
                                    gridClasses
                                )}
                                style={{
                                    animationDelay: `${delay + (index === MUSIC_PLAYER_POSITION ? 50 : 0)}ms`,
                                }}
                            >
                                <EventItem event={event} className="h-full" />
                            </div>
                        );

                        return items;
                    })}
                </div>
            </div>

            {/* Entry Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </Panel>
    );
}