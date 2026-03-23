import { CalendarIcon, MapPinIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Event } from "../types/events";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

export function EventItem({
    event,
    className,
}: {
    event: Event;
    className?: string;
}) {
    const hasBackgroundImage = !!event.backgroundImage;
    const showInlineImage = event.showImage !== false && event.image;

    return (
        <div
            className={cn(
                "group/event relative flex h-full w-full flex-col overflow-hidden border border-edge",
                event.link && "cursor-pointer",
                !hasBackgroundImage && !event.backgroundColor && "bg-card",
                event.backgroundColor,
                className
            )}
            onClick={() => {
                if (event.link) {
                    window.open(event.link, "_blank");
                }
            }}
        >
            {/* Background Image (The Main Visual) */}
            {hasBackgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={event.backgroundImage!}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            )}

            {/* Inline Image Section (optional) */}
            {showInlineImage && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                        src={event.image!}
                        alt={event.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            {/* Content Section */}
            <div className={cn(
                "relative z-10 flex flex-1 flex-col gap-2 p-3 md:gap-3 md:p-4",
                event.size === 'xxs' && "p-1 md:p-1.5",
                !showInlineImage && "pt-3 md:pt-4",
                event.size === 'xxs' && !showInlineImage && "pt-1 md:pt-1.5"
            )}>

                {/* Title */}
                <h3 className={cn(
                    "absolute top-2 left-2 z-20 font-sans text-[10px] font-bold uppercase tracking-wider text-white px-1",
                    // Respect property and hide on mobile
                    (event.showTitle === false || event.size === 'xxs') ? "hidden" : "hidden md:block",
                    // Smooth transition
                    "transition-all duration-300 ease-out",
                    // Desktop: show on hover
                    "md:opacity-0 md:-translate-y-1",
                    "md:group-hover/event:opacity-100 md:group-hover/event:translate-y-0"
                )}>
                    {event.title}
                </h3>

                {/* Tagline Overlay (Primarily for Socials) */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
                    <div className="mt-auto mb-2 md:mb-3">
                        {event.tagline && (
                            <span className={cn(
                                "px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg",
                                "text-[10px] md:text-xs font-bold text-white tracking-tight animate-in fade-in slide-in-from-bottom-2"
                            )}>
                                {event.tagline}
                            </span>
                        )}
                    </div>
                </div>

                {/* Legacy Description logic for non-socials */}
                {event.category !== "Social" && (
                    <div className="flex flex-1 flex-col justify-end">
                        {event.description && (
                            <p className={cn(
                                "text-xs md:text-sm line-clamp-2",
                                event.textColor || (hasBackgroundImage ? "text-white/80" : "text-muted-foreground")
                            )}>
                                {event.description}
                            </p>
                        )}
                    </div>
                )}

            </div>

            {/* Glassmorphic Action Button - Bottom Left */}
            <div
                className={cn(
                    "absolute bottom-2 left-2 z-20",
                    "flex items-center justify-center",
                    "size-6 md:size-8",
                    // Hide if flag is false or on mobile
                    event.showActionButton === false ? "hidden" : "hidden md:flex",
                    // Subtle glassmorphism effect
                    "backdrop-blur-xs",
                    hasBackgroundImage
                        ? "bg-white/10 border border-white/20"
                        : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10",
                    // Smooth transition
                    "transition-all duration-300 ease-out",
                    // Hover states
                    "md:opacity-0 md:translate-y-2",
                    "md:group-hover/event:opacity-100 md:group-hover/event:translate-y-0"
                )}
                aria-label="View link"
            >
                <ArrowUpRight
                    className={cn(
                        "size-3 md:size-4",
                        hasBackgroundImage ? "text-white/80" : "text-foreground/70"
                    )}
                />
            </div>

            {/* Border */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 ring-inset dark:ring-white/5" />
        </div>
    );
}
