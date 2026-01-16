"use client";

import { GearItem } from "../data/gear";
import { GearCard } from "./gear-card";

interface GearListProps {
    items: GearItem[];
}

export function GearList({ items }: GearListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-edge">
            {items.map((item) => (
                <div key={item.name} className="border-b border-r border-edge">
                    <GearCard item={item} />
                </div>
            ))}
        </div>
    );
}
