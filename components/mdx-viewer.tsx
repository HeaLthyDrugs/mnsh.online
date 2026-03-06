"use client";

import { useState, ReactNode } from "react";
import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MDXViewer({
    rawMdx,
    children
}: {
    rawMdx: string;
    children: ReactNode;
}) {
    const [view, setView] = useState<"rendered" | "source">("rendered");

    return (
        <div className="flex flex-col w-full">
            <Tabs value={view} onValueChange={(v) => setView(v as "rendered" | "source")} className="w-full">
                <div className="flex items-center justify-between mb-6 not-prose border-b border-edge pb-2">
                    <TabsList className="bg-transparent p-0">
                        <TabsTrigger
                            value="rendered"
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-4 pb-2 pt-2"
                        >
                            Rendered View
                        </TabsTrigger>
                        <TabsTrigger
                            value="source"
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-4 pb-2 pt-2"
                        >
                            MDX Source
                        </TabsTrigger>
                    </TabsList>

                    {view === "source" && (
                        <div className="flex items-center gap-2 pr-2">
                            <span className="text-sm text-muted-foreground hidden sm:inline-block">Copy MDX</span>
                            <CopyButton value={rawMdx} className="size-7" />
                        </div>
                    )}
                </div>

                <TabsContent value="rendered" className="mt-0 focus-visible:outline-none">
                    {children}
                </TabsContent>

                <TabsContent value="source" className="mt-0 focus-visible:outline-none">
                    <div className="relative">
                        {/* A simple implementation of syntax highlighting using pre/code and native foreground colors */}
                        <pre className="p-4 sm:p-6 rounded-lg bg-[#0d1117] overflow-x-auto text-[13px] leading-6 not-prose relative">
                            <code className="language-mdx text-[#c9d1d9]" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                {rawMdx}
                            </code>
                        </pre>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
