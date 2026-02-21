"use client";

import { WorkItem } from "./work-item";
import type { Post } from "../types/work-post";

interface WorkListProps {
    works: Post[];
}

export function WorkList({ works }: WorkListProps) {
    if (works.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-muted-foreground">No works found.</p>
            </div>
        );
    }

    return (
        <div className="relative py-4">
            <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
                <div className="border-r border-edge"></div>
                <div className="border-l border-edge"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {works.map((work, index) => (
                    <WorkItem
                        key={work.slug}
                        work={work}
                        shouldPreloadImage={index < 4}
                    />
                ))}
            </div>
        </div>
    );
}
