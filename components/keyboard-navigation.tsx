"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface KeyboardNavigationProps {
    previousUrl?: string | null;
    nextUrl?: string | null;
}

export function KeyboardNavigation({ previousUrl, nextUrl }: KeyboardNavigationProps) {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if user is typing in an input/textarea
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target instanceof HTMLElement && e.target.isContentEditable)
            ) {
                return;
            }

            // Left arrow = previous
            if (e.key === "ArrowLeft" && previousUrl) {
                e.preventDefault();
                router.push(previousUrl);
            }

            // Right arrow = next
            if (e.key === "ArrowRight" && nextUrl) {
                e.preventDefault();
                router.push(nextUrl);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [previousUrl, nextUrl, router]);

    // Render nothing - this is just for the keyboard listener
    return null;
}
