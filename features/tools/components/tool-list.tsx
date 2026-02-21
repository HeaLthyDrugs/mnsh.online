"use client";

import { Tool } from "../data/tools";
import { ToolCard } from "./tool-card";

interface ToolListProps {
    tools: Tool[];
}

export function ToolList({ tools }: ToolListProps) {
    return (
        <div className="grid grid-cols-1 border-l border-edge">
            {tools.map((tool) => (
                <div key={tool.name} className="border-b border-r border-edge">
                    <ToolCard tool={tool} />
                </div>
            ))}
        </div>
    );
}
