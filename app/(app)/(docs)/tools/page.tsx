import type { Metadata } from "next";
import { TOOLS } from "@/features/tools/data/tools";
import { ToolsContainer } from "@/features/tools/components/tools-container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Tools",
    description: "A curated collection of software and utilities that power my workflow.",
};

export default function Page() {
    return (
        <div className="min-h-svh">
            <div className="screen-line-after px-2 py-2">
                <h1 className="text-3xl font-semibold font-heading">Tools</h1>
            </div>

            <div className="px-2 py-2 screen-line-after">
                <p className="font-heading text-sm text-balance text-muted-foreground ">
                    {metadata.description as string}
                </p>
            </div>

            <Separator />

            <div className="screen-line-before p-2">
                <ToolsContainer tools={TOOLS} />
            </div>

            <div className="h-4" />
        </div>
    );
}


function Separator({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "relative flex h-8 w-full border-x border-edge",
                "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
                "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
                className
            )}
        />
    );
}