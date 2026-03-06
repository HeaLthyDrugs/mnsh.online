"use client";

import { useCollapsible } from "@/components/ui/collapsible";
import { PlusIcon } from "@/components/animated-icons/plus";

export function FaqAnimatedIcon() {
    const { open } = useCollapsible();
    return (
        <div className="shrink-0 flex items-center justify-center size-6 rounded-full text-muted-foreground/70" aria-hidden>
            <PlusIcon size={16} isOpen={open} className="size-4" />
        </div>
    );
}
