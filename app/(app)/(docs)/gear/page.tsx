import type { Metadata } from "next";
import { GEAR } from "@/features/gear/data/gear";
import { GearList } from "@/features/gear/components/gear-list";

export const metadata: Metadata = {
    title: "Gear",
    description: "The hardware, gadgets, and desk setup that keeps me productive.",
};

export default function Page() {
    return (
        <div>
            <div className="border-b border-edge px-2 py-2">
                <h1 className="text-3xl font-semibold font-heading">Gear</h1>
            </div>

            <div className="px-2 py-2">
                <p className="font-heading text-sm text-balance text-muted-foreground">
                    {metadata.description as string}
                </p>
            </div>

            <div className="border-t border-edge p-2">
                <GearList items={GEAR} />
            </div>
        </div>
    );
}
