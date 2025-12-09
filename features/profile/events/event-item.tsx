import { CalendarIcon, MapPinIcon } from "lucide-react";
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
                "group/event relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-edge transition-all duration-300",
                "hover:border-muted-foreground/30 hover:shadow-lg",
                !hasBackgroundImage && !event.backgroundColor && "bg-card",
                event.backgroundColor,
                className
            )}
        >
            {/* Background Image with Gradient Overlay */}
            {hasBackgroundImage && (
                <>
                    <div className="absolute inset-0 -z-0">
                        <Image
                            src={event.backgroundImage}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover/event:scale-105"
                            unoptimized
                        />
                    </div>
                    {event.gradientOverlay && (
                        <div
                            className={cn(
                                "absolute inset-0 -z-0 bg-gradient-to-br",
                                event.gradientOverlay
                            )}
                        />
                    )}
                </>
            )}

            {/* Inline Image Section (optional) */}
            {showInlineImage && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                        src={event.image!}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/event:scale-105"
                        unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                        <span className="rounded-md bg-primary/90 px-1.5 py-0.5 text-[10px] md:text-xs font-medium text-primary-foreground backdrop-blur-sm">
                            {event.category}
                        </span>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className={cn(
                "relative z-10 flex flex-1 flex-col gap-2 p-3 md:gap-3 md:p-4",
                !showInlineImage && "pt-5 md:pt-6"
            )}>
                {/* Category Badge (when no inline image) */}
                {!showInlineImage && (
                    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                        <span className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] md:text-xs font-medium backdrop-blur-sm",
                            hasBackgroundImage
                                ? "bg-white/20 text-white ring-1 ring-white/30"
                                : "bg-primary/90 text-primary-foreground"
                        )}>
                            {event.category}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h3 className={cn(
                    "text-sm md:text-base lg:text-lg font-semibold leading-snug text-balance line-clamp-2 transition-colors",
                    event.textColor || "text-foreground",
                    hasBackgroundImage && !event.textColor && "text-white"
                )}>
                    {event.title}
                </h3>

                {/* Date and Location */}
                <div className={cn(
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
                </div>

                {/* Description */}
                {event.description && (
                    <p className={cn(
                        "text-xs md:text-sm line-clamp-2 flex-1",
                        event.textColor || (hasBackgroundImage ? "text-white/80" : "text-muted-foreground")
                    )}>
                        {event.description}
                    </p>
                )}

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
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
                )}

                {/* Link Indicator (if event has a link) */}
                {event.link && (
                    <div className={cn(
                        "absolute bottom-2 left-2 text-[10px] opacity-50",
                        event.textColor || (hasBackgroundImage ? "text-white" : "text-muted-foreground")
                    )}>
                        🔗
                    </div>
                )}
            </div>

            {/* Hover Effect Border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 ring-inset transition-all group-hover/event:ring-black/10 dark:ring-white/5 dark:group-hover/event:ring-white/10" />
        </div>
    );
}
