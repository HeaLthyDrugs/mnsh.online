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
                !hasBackgroundImage && !event.backgroundColor && "bg-card",
                event.backgroundColor,
                className
            )}
        >
            {/* Background Image - No Overlay */}
            {hasBackgroundImage && (
                <div className="absolute inset-0 -z-0">
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
                !showInlineImage && "pt-3 md:pt-4"
            )}>

                {/* Title */}
                <h3 className={cn(
                    "text-sm md:text-base lg:text-lg font-semibold leading-snug text-balance line-clamp-2 transition-colors",
                    event.textColor || "text-foreground",
                    hasBackgroundImage && !event.textColor && "text-white"
                )}>
                    {event.title}
                </h3>

                {/* Date and Location */}
                {/* <div className={cn(
                    "flex flex-col gap-1 text-xs md:text-sm",
                    event.textColor || (hasBackgroundImage ? "text-white/90" : "text-muted-foreground")
                )}>
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <CalendarIcon className="size-3 md:size-3.5 shrink-0" />
                        <time className="truncate">{event.date}</time>
                    </div>
                    {event.location && (
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <MapPinIcon className="size-3 md:size-3.5 shrink-0" />
                            <span className="truncate">{event.location}</span>
                        </div>
                    )}
                </div> */}

                {/* Description */}
                {/* {event.description && (
                    <p className={cn(
                        "text-xs md:text-sm line-clamp-2 flex-1",
                        event.textColor || (hasBackgroundImage ? "text-white/80" : "text-muted-foreground")
                    )}>
                        {event.description}
                    </p>
                )} */}

                {/* Tags */}
                {/* {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-1.5 mt-auto">
                        {event.tags.slice(0, 3).map((tag, index) => (
                            <Tag
                                key={index}
                                className={cn(
                                    "text-[10px] md:text-xs pointer-events-none",
                                    hasBackgroundImage && "bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-sm"
                                )}
                            >
                                {tag}
                            </Tag>
                        ))}
                        {event.tags.length > 3 && (
                            <span className={cn(
                                "text-[10px] md:text-xs",
                                event.textColor || (hasBackgroundImage ? "text-white/70" : "text-muted-foreground")
                            )}>
                                +{event.tags.length - 3}
                            </span>
                        )}
                    </div>
                )} */}

            </div>

            {/* Glassmorphic Action Button - Bottom Left */}
            <button
                className={cn(
                    "absolute cursor-pointer bottom-3 left-3 z-20",
                    "flex items-center justify-center",
                    "size-9 md:size-10",
                    // Subtle glassmorphism effect
                    "backdrop-blur-xs",
                    hasBackgroundImage
                        ? "bg-white/10 hover:bg-white/15 border border-white/20"
                        : "bg-black/5 hover:bg-black/8 dark:bg-white/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/10",
                    // Smooth transition
                    "transition-all duration-300 ease-out",
                    // Mobile: always visible, Desktop: show on hover
                    "md:opacity-0 md:translate-y-2",
                    "md:group-hover/event:opacity-100 md:group-hover/event:translate-y-0",
                    // Focus state
                    "focus:outline-none focus:ring-2 focus:ring-white/30"
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    if (event.link) {
                        window.open(event.link, "_blank");
                    }
                }}
                aria-label="View event"
            >
                <ArrowUpRight
                    className={cn(
                        "size-4 md:size-5",
                        hasBackgroundImage ? "text-white/80" : "text-foreground/70"
                    )}
                />
            </button>

            {/* Border */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 ring-inset dark:ring-white/5" />
        </div>
    );
}
