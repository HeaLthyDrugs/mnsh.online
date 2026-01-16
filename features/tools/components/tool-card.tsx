"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tool } from "../data/tools";
import { Button } from "@/components/ui/button";

interface ToolCardProps {
    tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
    return (
        <Link
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative flex items-stretch justify-between gap-0 transition-colors hover:bg-muted/30 bg-background",
                "min-h-[50px]"
            )}
        >
            {/* Left Side: Image and Details */}
            <div className="flex items-center gap-3 flex-1 min-w-0 p-3">
                {/* Image */}
                <div className="relative size-12 shrink-0 overflow-hidden border border-dashed border-edge bg-muted/20">
                    {tool.image ? (
                        <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            className="object-cover p-1.5"
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground">
                            <span className="text-xs font-medium">{tool.name[0]}</span>
                        </div>
                    )}
                </div>

                {/* Title and Description */}
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium leading-none tracking-tight group-hover:text-primary transition-colors truncate">
                            {tool.name}
                        </h3>
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground/60 border border-edge px-1.5 py-0.5 bg-muted/10">
                            {tool.category}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground/80 line-clamp-1">
                        {tool.description}
                    </p>
                </div>
            </div>

            {/* Right Side: Preview Button */}
            <div className="shrink-0 px-3 border-l border-dashed border-edge flex items-center justify-center bg-muted/5">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-none text-muted-foreground/60 hover:text-primary hover:bg-transparent"
                >
                    <ArrowUpRight className="size-5" />
                    <span className="sr-only">Visit {tool.name}</span>
                </Button>
            </div>
        </Link>
    );
}
