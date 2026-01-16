"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GearItem } from "../data/gear";

interface GearCardProps {
    item: GearItem;
}

export function GearCard({ item }: GearCardProps) {
    return (
        <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative flex flex-col h-full bg-background transition-colors hover:bg-muted/30"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Top Image Section - optional, but let's make it inline for tightness or small block */}
                {/* Let's try a split view: Image Left | Content Right for tight feeling? 
             Or keep stack but tight. The user said "inside the card make the layout more structured".
         */}

                <div className="flex items-stretch border-b border-dashed border-edge">
                    <div className="relative w-20 shrink-0 border-r border-dashed border-edge bg-muted/10">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover grayscale transition-all group-hover:grayscale-0"
                                unoptimized
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground/50">{item.name[0]}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-2">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-medium leading-tight text-foreground/90 group-hover:text-primary transition-colors">
                                {item.name}
                            </h3>
                            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                            {item.category}
                        </span>
                    </div>
                </div>

                <div className="p-2 bg-muted/5 flex-1">
                    <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
