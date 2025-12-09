"use client";

import { Panel, PanelHeader, PanelTitle } from "../components/panel";
import { EVENTS } from "../data/events";
import { EventItem } from "./event-item";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { keys, EventsLayouts } from "@/utils/layout.helper";

// Import react-grid-layout styles
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Events() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        console.log("Events component mounted");
        console.log("EventsLayouts:", EventsLayouts);
        console.log("Keys:", keys);
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Panel id="events">
                <PanelHeader></PanelHeader>
                <div className="w-full p-4 min-h-[600px] flex items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            </Panel>
        );
    }

    return (
        <Panel id="events">
            <PanelHeader>
                {/* <PanelTitle>Events</PanelTitle> */}
            </PanelHeader>

            <div className="w-full p-4" style={{ minHeight: '800px' }}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={EventsLayouts}
                    breakpoints={{ lg: 1024, md: 768, sm: 640 }}
                    cols={{ lg: 3, md: 2, sm: 1 }}
                    rowHeight={200}
                    width={1200}
                    isDraggable={true}
                    isResizable={false}
                    compactType="vertical"
                    preventCollision={false}
                    margin={[4, 4]}
                    containerPadding={[0, 0]}
                    onLayoutChange={(layout, layouts) => {
                        console.log("Layout changed:", layout);
                    }}
                >
                    {keys.map((key, index) => {
                        const event = EVENTS[index % EVENTS.length];

                        return (
                            <div
                                key={key}
                                className="cursor-grab active:cursor-grabbing"
                                style={{ border: '2px solid red' }}
                            >
                                <EventItem event={event} />
                            </div>
                        );
                    })}
                </ResponsiveGridLayout>
            </div>
        </Panel>
    );
}