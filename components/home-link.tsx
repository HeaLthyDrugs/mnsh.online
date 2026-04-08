"use client";

import Link from "next/link";
import { useSound } from "@/hooks/use-sound";
import { MnshMark } from "@/components/mnsh-mark";

export function HomeLink() {
    const playHover = useSound("/sounds/hover.wav");
    const playTap = useSound("/sounds/tap.wav");

    return (
        <Link 
            href="/" 
            aria-label="Home" 
            className="flex h-full w-full items-center justify-center"
            onMouseEnter={playHover}
            onClick={playTap}
        >
            <MnshMark className="h-10 w-10 text-muted-foreground transition-colors duration-300 hover:text-foreground" />
        </Link>
    );
}
